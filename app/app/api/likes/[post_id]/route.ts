import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { likes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";
import { isNull } from "drizzle-orm";

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

    if (!post_id || !user_id) {
      return NextResponse.json(
        { error: "Either a post or user couldn't be found." },
        { status: 500 },
      );
    }
    const userpostlike_res = await db
      .select()
      .from(likes)
      .where(
        and(eq(likes.user_id, user_id), eq(likes.post_id, parseInt(post_id))),
      );
    const likes_res = await db
      .select()
      .from(likes)
      .where(
        and(eq(likes.post_id, parseInt(post_id)), isNull(likes.comment_id)),
      );
    const number_of_likes = likes_res.length;
    const user_liked = userpostlike_res.length > 0;
    return NextResponse.json({ user_liked, number_of_likes }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextResponse,
  { params }: { params: Promise<{ post_id: string }> },
) {
  try {
    let { liked } = await req.json();
    const { post_id } = await params;
    const token = req.cookies.get("session")?.value;
    let user_id = null;

    if (token) {
      const payload = await verifyToken(token);
      user_id = payload?.id;
    }

    if (!post_id || !user_id) {
      return NextResponse.json(
        { error: "Either a post or user couldn't be found." },
        { status: 500 },
      );
    }
    if (!post_id || !user_id) {
      return NextResponse.json(
        { error: "Either a post or user couldn't be found." },
        { status: 500 },
      );
    }
    if (!liked) {
      const res = await db.insert(likes).values({
        user_id: user_id,
        post_id: parseInt(post_id),
        comment_id: null,
      });
    } else {
      const res = await db
        .delete(likes)
        .where(
          and(eq(likes.user_id, user_id), eq(likes.post_id, parseInt(post_id))),
        );
    }
    const res = await db
      .select()
      .from(likes)
      .where(eq(likes.post_id, parseInt(post_id)));
    const likescount = res.length;
    return NextResponse.json({ ok: true, likescount }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
