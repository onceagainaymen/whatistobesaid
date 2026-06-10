import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validatePassword } from "@/utils/validation";

export async function POST(req: NextRequest) {
  try {
    const { id, currentPassword, newPassword, confirmNewPassword } =
      await req.json();
    if (!currentPassword || !newPassword || !confirmNewPassword)
      return NextResponse.json(
        { error: "Fields cannot be empty." },
        { status: 400 },
      );
    if (newPassword !== confirmNewPassword) {
      return NextResponse.json(
        { error: "Passwords don't match" },
        { status: 400 },
      );
    }
    const vresult = validatePassword(newPassword);
    if (!vresult.isValid) {
      return NextResponse.json({ error: vresult.error }, { status: 400 });
    }
    const fetched_password = await db
      .select({ password_hash: users.password_hash })
      .from(users)
      .where(eq(users.id, id));
    const valid = await bcrypt.compare(
      currentPassword,
      fetched_password[0].password_hash,
    );
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 },
      );
    }
    const newPassword_hash = await bcrypt.hash(newPassword, 12);
    await db
      .update(users)
      .set({ password_hash: newPassword_hash })
      .where(eq(id, id));
    return NextResponse.json({ ok: 200 }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
