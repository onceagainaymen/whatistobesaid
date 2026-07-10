// app/api/posts/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { like, or, eq, desc, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    const results = await db
      .select()
      .from(posts)
      .where(
        and(
          or(
            like(posts.title, `%${query}%`),
            like(posts.content, `%${query}%`),
          ),
          eq(posts.status, "published"),
        ),
      )
      .orderBy(desc(posts.created_at));

    return NextResponse.json({ results }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
