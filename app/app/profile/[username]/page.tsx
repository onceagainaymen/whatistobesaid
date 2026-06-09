import { eq } from "drizzle-orm";
import * as schema from "@/lib/db";
import { db } from "@/lib/db";
import ProfilePanel from "../../../components/profile_panel";
import PostGrid from "../../../components/post_grid";

export default async function Profile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const thisUser = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, username));
  const res = await fetch(
    `${process.env.URL}:3000/api/posts/${thisUser[0].id}`,
    {
      method: "GET",
    },
  );
  const data = await res.json();
  const posts = data.result;
  return (
    <div
      className="grid grid-cols-3 gap-4 mt-6 mx-4"
      style={{ fontFamily: "'Courier New', Courier, monospace" }}
    >
      {/* Posts column */}
      <div className="col-span-2 flex flex-col gap-4">
        <h1
          className="text-4xl font-black uppercase tracking-tight"
          style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
        >
          Posts by <span className="text-black/30">{thisUser[0].name}</span>
        </h1>
        <div className="w-full h-[2px] bg-black" />
        {posts.length !== 0 && <PostGrid posts={posts} />}
      </div>

      {/* Sticky profile column */}
      <div className="sticky top-6 self-start">
        <ProfilePanel
          username={thisUser[0].username}
          bio={thisUser[0].bio}
          joinDate={thisUser[0].created_at.split(" ")[0]}
          postCount={posts.length}
        />
      </div>
    </div>
  );
}
