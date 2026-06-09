"use client";

import ButtonAlt from "./button_alt";
import { motion, AnimatePresence } from "framer-motion";
import PostPage from "./post_page";
import { useState } from "react";
import PostCard from "./post_card";
import PostCreate from "./post_create";

type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
};

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
    title: "notes",
    date: "4 May 2026",
    content: "short post. quick thought. one line and done.",
  },
  {
    id: 3,
    title: "another one",
    image: "/nomads.jpeg",
    date: "29 April 2026",
    content:
      "longer content so this card grows higher and creates the pinterest-style stagger in the masonry columns.",
  },
  { id: 4, title: "tiny", date: "2 May 2026", content: "just a tiny post." },
  {
    id: 8,
    title: "Barcelona",
    date: "4 May 2026",
    image: "/maradona.jpg",
    content:
      "last sample post in the index. replace this mock data with your real post source later.",
  },
  {
    id: 5,
    title: "draft",
    date: "1 May 2026",
    content:
      "this one has a bit more copy. enough text to force more height and produce the stacked look with little to no vertical gap.",
  },
  {
    id: 6,
    title: "image post",
    date: "30 April 2026",
    image: "/monke.jpeg",
    content: "caption text.",
  },
  {
    id: 7,
    title: "final",
    date: "4 May 2026",
    content:
      "last sample post in the index. replace this mock data with your real post source later.",
  },
  {
    id: 9,
    title: "Random",
    date: "4 May 2026",
    content:
      "last sample post in the index. replace this mock data with your real post source later.",
  },
  {
    id: 10,
    title: "Another Random",
    date: "4 May 2026",
    content:
      "Vestibulum feugiat nec erat quis egestas. Aliquam imperdiet malesuada enim, vitae interdum enim dictum et. Fusce nulla odio, congue vitae cursus vitae, luctus eu nibh. Nulla purus sapien, venenatis vel consectetur eu, viverra a nulla. Vestibulum sem velit, eleifend at nibh vitae, ornare ultricies massa. In viverra turpis metus, vitae sollicitudin massa viverra eu. Praesent pellentesque sem arcu, in vestibulum dui imperdiet sed. Donec eget dignissim sapien. Ut tempus nibh a tortor cursus convallis. Nullam erat ante, bibendum aliquet ligula vitae, pulvinar aliquet nunc. Integer imperdiet mauris ex, vel dignissim lorem auctor vel. Duis non elementum felis, sit amet tempor risus. Ut ac dignissim nunc. Sed condimentum, erat et iaculis placerat, felis nibh pellentesque sapien, nec porta velit odio quis diam. Duis sit amet urna sed urna elementum blandit ac sit amet dui. Mauris suscipit diam dolor, nec facilisis metus ornare vitae.",
  },
];

export default function Index({ session }) {
  enum E {
    POST,
    POSTCREATE,
  }
  const [expanded, setExpanded] = useState(true);
  const [chosenPost, setChosenPost] = useState(null);
  const [page, setPage] = useState(E.POST);

  return (
    <div style={{ paddingBottom: expanded ? "80vh" : "4rem" }}>
      {!expanded && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {page === E.POSTCREATE && <PostCreate session={session} />}
            {page === E.POST && <PostPage post={chosenPost} />}
          </motion.div>
        </AnimatePresence>
      )}
      <section
        className={`
        mt-10 fixed bottom-0 left-0 w-full overflow-hidden bg-white
        transition-[height] duration-700 ease-in-out
        ${expanded ? "h-[80vh]" : "h-16"}
      `}
      >
        <div className="px-4 pt-2">
          <div className="border-t border-black" />
          <button
            type="button"
            className="w-full py-2 text-center text-sm uppercase tracking-wide"
            onClick={() => !expanded && setExpanded((prev) => !prev)}
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
            <div
              className="mb-1 break-inside-avoid border-black flex items-center justify-center"
              style={{ minHeight: "120px" }}
            >
              <button
                onClick={() => {
                  setExpanded((prev) => !prev);
                  setPage(E.POSTCREATE);
                }}
              >
                <ButtonAlt text="Create yours" />
              </button>
            </div>
            {posts.map((post) => (
              <div
                key={post.id}
                className="mb-1 break-inside-avoid"
                onClick={() => {
                  setPage(E.POST);
                  setExpanded((prev) => !prev);
                  setChosenPost(post);
                }}
              >
                <PostCard
                  date={post.date}
                  title={post.title}
                  content={post.content}
                  image={post.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
