"use client";

import { useState } from "react";
import PostCard from "./post_card";

type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
};

const posts: Post[] = [
  { id: 1, title: "hello", date: "5 May 2026", image: "/lenin.png", content: "miaou miaou miaou" },
  { id: 2, title: "notes", date: "4 May 2026", content: "short post. quick thought. one line and done." },
  {
    id: 3,
    title: "another one",
    image: "/lenin.webp",
    date: "29 April 2026",
    content:
      "longer content so this card grows higher and creates the pinterest-style stagger in the masonry columns.",
  },
  { id: 4, title: "tiny", date: "2 May 2026", content: "just a tiny post." },
  {
    id: 5,
    title: "draft",
    date: "1 May 2026",
    content:
      "this one has a bit more copy. enough text to force more height and produce the stacked look with little to no vertical gap.",
  },
  { id: 6, title: "image post", date: "30 April 2026", image: "/lenin.png", content: "caption text." },
  {
    id: 7,
    title: "final",
    date: "4 May 2026",
    content: "last sample post in the index. replace this mock data with your real post source later.",
  },
];

export default function Index() {
  const [expanded, setExpanded] = useState(true);

  return (
    <section
      className={`
        fixed bottom-0 left-0 w-full overflow-hidden bg-white
        transition-[height] duration-700 ease-in-out
        ${expanded ? "h-[80vh]" : "h-16"}
      `}
    >
      <div className="px-4 pt-2">
        <div className="border-t border-black" />
        <button
          type="button"
          className="w-full py-2 text-center text-sm uppercase tracking-wide"
          onClick={()=> !expanded && setExpanded((prev) => !prev)}
        >
          index
        </button>
      </div>

      <div
        className={`
          h-[calc(80vh-3rem)] overflow-y-auto px-2 pb-2
          transition-opacity duration-300
          ${expanded ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-1">
          {posts.map((post) => (
            <div key={post.id} className="mb-1 break-inside-avoid" onClick={() => setExpanded((prev) => !prev)}>
              <PostCard date={post.date} title={post.title} content={post.content} image={post.image} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
