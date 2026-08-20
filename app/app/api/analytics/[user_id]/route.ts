import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> },
) {
  try {
    const { user_id } = await params;
    const userIdNum = parseInt(user_id);
    console.log("ID:" + user_id);
    // 1. Total posts
    const totalPostsResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(posts)
      .where(and(eq(posts.user_id, userIdNum), eq(posts.status, "published")));

    const totalPosts = totalPostsResult[0]?.count || 0;

    // 2. Total likes
    const totalLikesResult = await db
      .select({ sum: sql<number>`SUM(${posts.like_count})` })
      .from(posts)
      .where(and(eq(posts.user_id, userIdNum), eq(posts.status, "published")));

    const totalLikes = totalLikesResult[0]?.sum || 0;

    // 3. Average sentiment
    const avgSentimentResult = await db
      .select({ avg: sql<number>`AVG(${posts.score})` })
      .from(posts)
      .where(
        and(
          eq(posts.user_id, userIdNum),
          eq(posts.status, "published"),
          sql`${posts.score} IS NOT NULL`,
        ),
      );

    const avgSentiment = avgSentimentResult[0]?.avg || 0;

    // 4. Average likes (for hot posts calculation)
    const avgLikesResult = await db
      .select({ avg: sql<number>`AVG(${posts.like_count})` })
      .from(posts)
      .where(and(eq(posts.user_id, userIdNum), eq(posts.status, "published")));

    const avgLikes = avgLikesResult[0]?.avg || 0;

    // 5. Hot posts count (posts with likes > average likes)
    // prettier-ignore
    const hotPostsResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(posts)
      .where(
        and(
          eq(posts.user_id, userIdNum),
          eq(posts.status, "published"),
          sql`${posts.like_count} > ${avgLikes}`
        ),
      );

    const hotPosts = hotPostsResult[0]?.count || 0;

    // 6. Top posts (by likes)
    const topPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        like_count: posts.like_count,
        score: posts.score,
      })
      .from(posts)
      .where(and(eq(posts.user_id, userIdNum), eq(posts.status, "published")))
      .orderBy(sql`${posts.like_count} DESC`)
      .limit(3);

    // 7. Controversial posts (negative sentiment + likes > 0)
    // prettier-ignore
    const controversial = await db
    .select({
      id: posts.id,
      title: posts.title,
      like_count: posts.like_count,
      score: posts.score,
    })
    .from(posts)
    .where(
      and(
        eq(posts.user_id, userIdNum),
        eq(posts.status, "published"),
        sql`${posts.score} < 0`,
        sql`${posts.like_count} > 0`
      )
    ).limit(3)
    .orderBy(sql`${posts.like_count} DESC`);

    return NextResponse.json({
      totalPosts,
      totalLikes,
      avgSentiment: Number(avgSentiment),
      hotPosts,
      topPosts,
      controversial,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
