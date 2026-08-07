import { db } from "@/lib/db";
import { posts, users, follows } from "@/lib/db/schema"; // ← added follows
import { NextRequest, NextResponse } from "next/server";
import { eq, and, count, desc, sql } from "drizzle-orm"; // ← added sql
import { verifyToken } from "@/lib/auth"; // ← added this
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") as "draft" | "published";
    const image = formData.get("image") as File | null;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 },
      );
    }

    let imagePath = null;
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${crypto.randomUUID()}-${path.extname(image.name)}`;
      const filepath = path.join(process.cwd(), "public", "uploads", filename);
      await mkdir(path.join(process.cwd(), "public", "uploads"), {
        recursive: true,
      });
      await writeFile(filepath, buffer);
      imagePath = `/uploads/${filename}`;
    }

    const res = await db.insert(posts).values({
      title: title,
      content: content,
      status: status,
      user_id: id,
      image_path: imagePath,
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}

// THE INDEX ALGORITHM
// app/api/posts/route.ts
export async function GET(req: NextRequest) {
  try {
    // 1. Get logged-in user from session
    const token = req.cookies.get("session")?.value;
    let userId = null;
    if (token) {
      try {
        const payload = await verifyToken(token);
        userId = payload?.id || null;
      } catch {
        userId = null;
      }
    }

    const cursor = req.nextUrl.searchParams.get("cursor");
    const limit = 20;
    let results;

    // 2. Logged-in user: personalized feed
    if (userId) {
      const followed = await db
        .select({ id: follows.following_id })
        .from(follows)
        .where(eq(follows.follower_id, userId));

      const followedIds = followed.map((f) => f.id);
      const hasFollowed = followedIds.length > 0;

      let query = db
        .select({
          id: posts.id,
          user_id: posts.user_id,
          title: posts.title,
          content: posts.content,
          status: posts.status,
          image_path: posts.image_path,
          like_count: posts.like_count,
          score: posts.score,
          created_at: posts.created_at,
          author_name: users.name,
          author_username: users.username,
        })
        .from(posts)
        .leftJoin(users, eq(users.id, posts.user_id))
        .where(sql`${posts.status} = 'published'`);

      if (hasFollowed) {
        query = query.where(sql`
          ${posts.user_id} IN (${followedIds.join(",")}) OR
          (${posts.like_count} + GREATEST(COALESCE(${posts.score}, 0), 0) * 10) > 5
        `);
      }

      if (cursor) {
        query = query.where(sql`${posts.id} < ${parseInt(cursor)}`);
      }

      results = await query
        .orderBy(
          sql`
          (UNIX_TIMESTAMP(${posts.created_at}) / 3600) * 0.5 +
          (${posts.like_count} + GREATEST(COALESCE(${posts.score}, 0), 0) * 10) * 0.3 +
          ${hasFollowed ? sql`CASE WHEN ${posts.user_id} IN (${followedIds.join(",")}) THEN 5 ELSE 0 END` : sql`0`}
          DESC
        `,
        )
        .limit(limit + 1);
    }
    // 3. Guest: popular posts
    else {
      let query = db
        .select({
          id: posts.id,
          user_id: posts.user_id,
          title: posts.title,
          content: posts.content,
          status: posts.status,
          image_path: posts.image_path,
          like_count: posts.like_count,
          score: posts.score,
          created_at: posts.created_at,
          author_name: users.name,
          author_username: users.username,
        })
        .from(posts)
        .leftJoin(users, eq(users.id, posts.user_id))
        .where(sql`${posts.status} = 'published'`);

      if (cursor) {
        query = query.where(sql`${posts.id} < ${parseInt(cursor)}`);
      }

      results = await query
        .orderBy(
          sql`
          (UNIX_TIMESTAMP(${posts.created_at}) / 3600) * 0.5 +
          (${posts.like_count} + GREATEST(COALESCE(${posts.score}, 0), 0) * 10) * 0.3
          DESC
        `,
        )
        .limit(limit + 1);
    }

    // 4. Pagination
    const hasMore = results.length > limit;
    const postsData = hasMore ? results.slice(0, -1) : results;
    const nextCursor = hasMore ? postsData[postsData.length - 1].id : null;

    return NextResponse.json({ posts: postsData, nextCursor });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
