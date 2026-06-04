import { eq } from "drizzle-orm";
import * as schema from "../../../lib/db";
import { db } from "../../../lib/db";
import ProfilePanel from "../../../components/profile_panel";
import PostGrid from "../../../components/post_grid";
const posts: Post[] = [
  {
    id: 1,
    title: "Pero",
    date: "5 May 2026",
    image: "/trot.jpeg",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Notes",
    date: "4 May 2026",
    content: "short post. quick thought. one line and done.",
  },
  {
    id: 3,
    title: "Another One",
    image: "/nomads.jpeg",
    date: "29 April 2026",
    content:
      "longer content so this card grows higher and creates the pinterest-style stagger in the masonry columns.",
  },
  { id: 4, title: "Tiny", date: "2 May 2026", content: "just a tiny post." },
  {
    id: 5,
    title: "Barcelona",
    date: "4 May 2026",
    image: "/maradona.jpg",
    content:
      "last sample post in the index. replace this mock data with your real post source later.",
  },
  {
    id: 6,
    title: "Draft",
    date: "1 May 2026",
    content:
      "this one has a bit more copy. enough text to force more height and produce the stacked look.",
  },
  {
    id: 7,
    title: "Image Post",
    date: "30 April 2026",
    image: "/monke.jpeg",
    content: "caption text.",
  },
  {
    id: 8,
    title: "Final",
    date: "4 May 2026",
    content: "last sample post in the index.",
  },
  {
    id: 9,
    title: "Random",
    date: "3 May 2026",
    image: "/trot.jpeg",
    content: "some random thoughts jotted down late at night.",
  },
  {
    id: 10,
    title: "Fragments",
    date: "28 April 2026",
    content: "incomplete ideas. half-formed sentences. posted anyway.",
  },
];

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
        <PostGrid posts={posts} />
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
