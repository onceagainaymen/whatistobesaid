import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const userIdNum = parseInt(userId);

    // 1. Total posts
    const totalPostsResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(posts)
      .where(eq(posts.user_id, userIdNum))
      .where(eq(posts.status, "published"));

    const totalPosts = totalPostsResult[0]?.count || 0;

    // 2. Total likes
    const totalLikesResult = await db
      .select({ sum: sql<number>`SUM(${posts.like_count})` })
      .from(posts)
      .where(eq(posts.user_id, userIdNum))
      .where(eq(posts.status, "published"));

    const totalLikes = totalLikesResult[0]?.sum || 0;

    // 3. Average sentiment
    const avgSentimentResult = await db
      .select({ avg: sql<number>`AVG(${posts.score})` })
      .from(posts)
      .where(eq(posts.user_id, userIdNum))
      .where(eq(posts.status, "published"))
      .where(sql`${posts.score} IS NOT NULL`);

    const avgSentiment = avgSentimentResult[0]?.avg || 0;

    // 4. Average likes (for hot posts calculation)
    const avgLikesResult = await db
      .select({ avg: sql<number>`AVG(${posts.like_count})` })
      .from(posts)
      .where(eq(posts.user_id, userIdNum))
      .where(eq(posts.status, "published"));

    const avgLikes = avgLikesResult[0]?.avg || 0;

    // 5. Hot posts count (posts with likes > average likes)
    const hotPostsResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(posts)
      .where(eq(posts.user_id, userIdNum))
      .where(eq(posts.status, "published"))
      .where(sql`${posts.like_count} > ${avgLikes}`);

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
      .where(eq(posts.user_id, userIdNum))
      .where(eq(posts.status, "published"))
      .orderBy(sql`${posts.like_count} DESC`)
      .limit(10);

    // 7. Controversial posts (negative sentiment + likes > 0)
    const controversial = await db
      .select({
        id: posts.id,
        title: posts.title,
        like_count: posts.like_count,
        score: posts.score,
      })
      .from(posts)
      .where(eq(posts.user_id, userIdNum))
      .where(eq(posts.status, "published"))
      .where(sql`${posts.score} < 0`)
      .where(sql`${posts.like_count} > 0`)
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
      { status: 500 }
    );
  }
}
