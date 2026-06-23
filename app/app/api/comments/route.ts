import { comments } from "@/lib/db/schema";
import { likes } from "@/lib/db/schema";
import { eq, and, count, desc, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await db.delete(comments).where(eq(comments.id, parseInt(id)));
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
