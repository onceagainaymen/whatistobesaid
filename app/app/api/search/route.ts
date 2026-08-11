// app/api/posts/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts, users } from "@/lib/db/schema";
import { sql, eq, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    const results = await db
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
      .where(
        and(
          sql`MATCH(${posts.title}, ${posts.content}) AGAINST(${query} IN BOOLEAN MODE)`,
          eq(posts.status, "published"),
        ),
      )
      .orderBy(
        sql`MATCH(${posts.title}, ${posts.content}) AGAINST(${query} IN BOOLEAN MODE) DESC`,
      );

    return NextResponse.json({ results }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
