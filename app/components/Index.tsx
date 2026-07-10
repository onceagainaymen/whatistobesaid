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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/posts/");
      const data = await res.json();
      setPosts(data.result);
      setLoading(false);
    })();
  }, []);
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
    const data = await res.json();
    setPosts(data.results);
  };

  return (
    <div style={{ paddingBottom: expanded ? "80vh" : "4rem" }}>
      {/* Search Bar - Top Center */}
      <div className="flex justify-center pt-6 pb-4">
        <div className="relative w-full max-w-md px-4">
          <div className="absolute inset-0 translate-x-[4px] translate-y-[4px] bg-black -z-10" />
          <div className="flex border-2 border-black bg-white overflow-hidden">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-sm bg-transparent outline-none placeholder:text-black/30"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            />
            <button
              className="px-4 py-2 bg-black text-white text-[10px] font-black tracking-[0.2em] uppercase hover:bg-gray-400 hover:text-black transition-colors duration-150"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {!expanded && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {page === E.POSTCREATE && <PostCreate session={session} />}
            {page === E.POST && (
              <PostPage session={session} post={chosenPost} />
            )}
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
                  <PostCard post={post} session={session} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
