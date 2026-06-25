import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts, users } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Couldn't fetch user id." },
        { status: 500 },
      );
    }
    const posts_res = await db
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
        updated_at: posts.updated_at,
        author_name: users.name,
        author_username: users.username,
      })
      .from(posts)
      .leftJoin(users, eq(users.id, posts.user_id))
      .where(
        and(eq(posts.user_id, parseInt(id)), eq(posts.status, "published")),
      );
    return NextResponse.json({ result: posts_res }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await db.delete(posts).where(eq(posts.id, parseInt(id)));
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
