import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, title, content, status } = await req.json();
    if (!title || !content) {
      return NextResponse.json(
        { error: "Fields cannot be empty." },
        { status: 400 },
      );
    }
    const res = await db
      .insert(posts)
      .values({ title: title, content: content, status: status, user_id: id });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
