import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { signToken, sessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, name, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email and password are required." },
        { status: 400 },
      );
    }

    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(or(eq(users.email, email), eq(users.username, username)))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Username or email already taken." },
        { status: 409 },
      );
    }

    const password_hash = await bcrypt.hash(password, 12);

    const [result] = await db.insert(users).values({
      username,
      name: name || null,
      email,
      password_hash,
    });

    const token = await signToken({
      id: result.insertId,
      username,
      email,
    });

    const res = NextResponse.json({ ok: true }, { status: 201 });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
