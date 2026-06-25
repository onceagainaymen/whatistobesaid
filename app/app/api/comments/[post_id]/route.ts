import { verifyToken } from "@/lib/auth";
import { comments } from "@/lib/db/schema";
import { likes, posts, users } from "@/lib/db/schema";
import { eq, and, count, desc, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ post_id: string }> },
) {
  try {
    const { post_id } = await params;
    const token = req.cookies.get("session")?.value;
    let user_id = null;
    if (token) {
      const payload = await verifyToken(token);
      user_id = payload?.id;
    }

    const res = await db
      .select({
        id: comments.id,
        content: comments.content,
        post_id: comments.post_id,
        user_id: comments.user_id,
        like_count: comments.like_count,
        created_at: comments.created_at,
        user_liked: sql<boolean>`COUNT(${likes.user_id}) > 0`,
        author_name: users.name,
        author_username: users.username,
      })
      .from(comments)
      .leftJoin(users, eq(users.id, comments.user_id))
      .leftJoin(
        likes,
        and(eq(likes.comment_id, comments.id), eq(likes.user_id, user_id)),
      )
      .where(eq(comments.post_id, parseInt(post_id)))
      .groupBy(comments.id)
      .orderBy(desc(comments.like_count));
    return NextResponse.json({ result: res }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ post_id: string }> },
) {
  try {
    const { content } = await req.json();
    const { post_id } = await params;
    const token = req.cookies.get("session")?.value;
    let user_id = null;
    if (token) {
      const payload = await verifyToken(token);
      user_id = payload?.id;
    }
    const res = await db.insert(comments).values({
      user_id: user_id,
      post_id: parseInt(post_id),
      content: content,
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
