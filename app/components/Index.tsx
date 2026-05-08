"use client";

import { useState } from "react";
import PostCard from "./post_card"

export default function Index() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      onClick={() => setExpanded(prev => !prev)}
      className={`
        fixed bottom-0 w-full overflow-hidden
        transition-all duration-900 ease-in-out
        ${expanded ? "h-[80vh]" : "h-[4rem]"}
      `}
    >
      <div className="mx-4 border-t"></div>
      <p className="text-center">index</p>
      <div className="overflow-y-auto p-4">
      <div className="grid grid-cols-4 gap-4">
          <PostCard title="hello" image="/lenin.png" content="miaou miaou miaou"/>
          <PostCard title="hello" content="miaou miaou miaou"/>
        </div>
      </div>
    </div>
  );
}
