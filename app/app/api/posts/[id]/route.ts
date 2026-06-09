import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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
      .select()
      .from(posts)
      .where(eq(posts.user_id, parseInt(id)));
    return NextResponse.json({ result: posts_res }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
