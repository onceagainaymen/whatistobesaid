"use client";

import LoadingComp from "./loading_comp";
import ButtonAlt from "./button_alt";
import { motion, AnimatePresence } from "framer-motion";
import PostPage from "./post_page";
import { useState, useEffect } from "react";
import PostCard from "./post_card";
import PostCreate from "./post_create";

export default function Index({ session }) {
  enum E {
    POST,
    POSTCREATE,
  }
  const [expanded, setExpanded] = useState(true);
  const [chosenPost, setChosenPost] = useState(null);
  const [page, setPage] = useState(E.POST);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/posts/");
      const data = await res.json();
      setPosts(data.result);
      setLoading(false);
    })();
  }, []);
  console.log(posts[0]);
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

        {loading && <LoadingComp />}
        {!loading && (
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
        )}
      </section>
    </div>
  );
}
