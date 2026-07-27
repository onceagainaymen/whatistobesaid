import { db } from "@/lib/db";
import { posts, users } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, and, count, desc } from "drizzle-orm";
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
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = 20;
    const offset = (page - 1) * limit;

    const results = await db
      .select({
        id: posts.id,
        user_id: posts.user_id,
        title: posts.title,
        content: posts.content,
        status: posts.status,
        image_path: posts.image_path,
        like_count: posts.like_count,
        created_at: posts.created_at,
        author_name: users.name,
        author_username: users.username,
      })
      .from(posts)
      .leftJoin(users, eq(users.id, posts.user_id))
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.id))
      .limit(limit)
      .offset(offset);

    const totalResult = await db
      .select({ count: count() })
      .from(posts)
      .where(eq(posts.status, "published"));

    const total = totalResult[0].count;
    const hasMore = offset + limit < total;

    return NextResponse.json({ posts: results, hasMore, page });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
