import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { id, name, username, email, bio } = await req.json();

    if (!name || !username || !email) {
      return NextResponse.json({
        error: "Required fields were not set.",
        status: 400,
      });
    }
    await db
      .update(users)
      .set({
        name: name,
        username: username,
        email: email,
        bio: bio ? bio : "",
      })
      .where(eq(users.id, id));
    return NextResponse.json({ ok: true, status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
