import ErrorPage from "../../../components/error_page";
import { eq } from "drizzle-orm";
import * as schema from "@/lib/db";
import { db } from "@/lib/db";
import ProfilePanel from "../../../components/profile_panel";
import PostGrid from "../../../components/post_grid";
import { getSession } from "@/lib/auth";
import AnalyticsDashboard from "../../../components/analytics_dashboard";

export default async function Profile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const session = await getSession();
  const thisUser = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, username));
  if (thisUser.length === 0)
    return <ErrorPage status={404} message="USER DOESN'T EXIST!" />;
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

        {/* Analytics moved here - right after the header */}
        <AnalyticsDashboard userId={thisUser[0].id} />

        {posts.length !== 0 && <PostGrid posts={posts} session={session} />}
      </div>

      {/* Sticky profile column */}
      <div className="sticky top-6 self-start">
        <ProfilePanel
          id={thisUser[0].id}
          username={thisUser[0].username}
          bio={thisUser[0].bio}
          joinDate={thisUser[0].created_at.split(" ")[0]}
          postCount={posts.length}
          session={session}
        />
      </div>
    </div>
  );
}
