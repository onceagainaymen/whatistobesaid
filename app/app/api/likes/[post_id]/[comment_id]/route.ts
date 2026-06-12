import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { comments, likes } from "@/lib/db/schema";
import { eq, sql, count } from "drizzle-orm";
import { and } from "drizzle-orm";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ post_id: string; comment_id: string }> },
) {
  try {
    const { post_id, comment_id } = await params;

    const token = req.cookies.get("session")?.value;
    let user_id = null;

    if (token) {
      const payload = await verifyToken(token);
      user_id = payload?.id;
    }
    const res = await db
      .select({ count: count(likes.id) })
      .from(likes)
      .where(
        and(
          eq(likes.post_id, parseInt(post_id)),
          eq(likes.user_id, user_id),
          eq(likes.comment_id, parseInt(comment_id)),
        ),
      );
    const user_liked = res[0].count > 0;
    if (user_liked) {
      await db
        .delete(likes)
        .where(
          and(
            eq(likes.user_id, user_id),
            eq(likes.post_id, parseInt(post_id)),
            eq(likes.comment_id, parseInt(comment_id)),
          ),
        );

      // Decrement the comment's like count
      await db
        .update(comments)
        .set({ like_count: sql`${comments.like_count} - 1` })
        .where(eq(comments.id, parseInt(comment_id)));
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    // Insert the like
    await db.insert(likes).values({
      user_id: user_id,
      post_id: parseInt(post_id),
      comment_id: parseInt(comment_id),
    });

    // Increment the comment's like count
    await db
      .update(comments)
      .set({ like_count: sql`${comments.like_count} + 1` })
      .where(eq(comments.id, parseInt(comment_id)));

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
