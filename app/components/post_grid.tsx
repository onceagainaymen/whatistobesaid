// components/PostGrid.tsx
"use client";

import { useState } from "react";
import PostCard from "./post_card";

type Post = {
  id: number;
  title: string;
  content: string;
  date?: string;
  image?: string;
};

type PostGridProps = {
  posts: Post[];
  onPostClick?: (post: Post) => void;
};

export default function PostGrid({ posts, onPostClick }: PostGridProps) {
  console.log("Lookie here");
  console.log(posts[0]);
  return (
    <div className="columns-2 sm:columns-3 gap-1 w-full">
      {posts.map((post) => (
        <div
          key={post.id}
          className="mb-1 break-inside-avoid"
          onClick={() => onPostClick?.(post)}
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
