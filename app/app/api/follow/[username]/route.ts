import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, follows } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const { own_username } = await req.json();

    if (!username || !own_username) {
      return NextResponse.json(
        { error: "Both usernames are required." },
        { status: 400 }
      );
    }

    // Fetch both users' IDs
    const [targetUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    const [currentUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, own_username))
      .limit(1);

    if (!targetUser || !currentUser) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // Check if already following
    const existing = await db
      .select()
      .from(follows)
      .where(
        and(
          eq(follows.follower_id, currentUser.id),
          eq(follows.following_id, targetUser.id)
        )
      );

    if (existing.length > 0) {
      // Unfollow
      await db
        .delete(follows)
        .where(
          and(
            eq(follows.follower_id, currentUser.id),
            eq(follows.following_id, targetUser.id)
          )
        );
      return NextResponse.json({ following: false }, { status: 200 });
    } else {
      // Follow
      await db.insert(follows).values({
        follower_id: currentUser.id,
        following_id: targetUser.id,
      });
      return NextResponse.json({ following: true }, { status: 200 });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const { own_username } = await req.json();

    if (!username || !own_username) {
      return NextResponse.json(
        { error: "Both usernames are required." },
        { status: 400 }
      );
    }

    // Fetch both users' IDs
    const [targetUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    const [currentUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, own_username))
      .limit(1);

    if (!targetUser || !currentUser) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // Delete the follow
    await db
      .delete(follows)
      .where(
        and(
          eq(follows.follower_id, currentUser.id),
          eq(follows.following_id, targetUser.id)
        )
      );

    return NextResponse.json({ following: false }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const own_username = req.nextUrl.searchParams.get("own_username");

    if (!username || !own_username) {
      return NextResponse.json(
        { error: "Both usernames are required." },
        { status: 400 }
      );
    }

    // Fetch both users' IDs
    const [targetUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    const [currentUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, own_username))
      .limit(1);

    if (!targetUser || !currentUser) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // Check if following
    const existing = await db
      .select()
      .from(follows)
      .where(
        and(
          eq(follows.follower_id, currentUser.id),
          eq(follows.following_id, targetUser.id)
        )
      );

    return NextResponse.json({ 
      following: existing.length > 0 
    }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
