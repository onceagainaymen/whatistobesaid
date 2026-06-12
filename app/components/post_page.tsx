"use client";

import { useState } from "react";
import { useEffect } from "react";

export default function PostPage({
  post,
  initialLiked = false,
  initialLikeCount = 0,
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleLike = async () => {
    const res = await fetch(`/api/likes/${post.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        liked,
        likeCount,
      }),
    });
    const data = await res.json();
    if (!res.ok) console.log(data.error);
    setLiked(!liked);
    setLikeCount(data.likeCount);
  };

  const handleCommentLike = async (commentIndex: number) => {
    const comment = comments[commentIndex];

    await fetch(`/api/likes/${post.id}/${comment.id}`, {
      method: "POST",
    });

    // Refetch comments
    const res = await fetch(`/api/comments/${post.id}`);
    const data = await res.json();
    setComments(data.result);
  };

  async function fetchComments() {
    const res = await fetch(`/api/comments/${post.id}`);
    const data = await res.json();
    setComments(data.result);
    console.log("like count: " + data.result[0].like_count);
    console.log("user liked: " + data.result[0].user_liked);
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const res = await fetch(`/api/comments/${post.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newComment,
      }),
    });
    fetchComments();
    setNewComment("");
  };

  async function fetchLikes() {
    const res = await fetch(`/api/likes/${post.id}`);
    const data = await res.json();
    setLikeCount(data.number_of_likes);
    setLiked(data.user_liked);
  }

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, []);
  return (
    <main className="min-h-screen bg-white">
      <div className="flex items-start max-w-6xl mx-auto px-6 py-12 gap-8">
        {/* Left: Post content */}
        <div className="flex-1 min-w-0">
          {/* Meta row with like button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 bg-black" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/50">
                {post.date}
              </span>
            </div>

            {/* Like Button */}
            <button
              onClick={handleLike}
              className="flex items-center gap-1 transition-transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                className="w-5 h-5 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-xs font-bold text-black/70">
                {likeCount}
              </span>
            </button>
          </div>

          {/* Title */}
          <h1
            className="text-[clamp(2rem,8vw,3.5rem)] font-black uppercase tracking-tight leading-[1.0] mb-6"
            style={{
              fontFamily:
                "'Arial Black', 'Haettenschweiler', Impact, sans-serif",
            }}
          >
            {post.title}
          </h1>

          <div className="w-full h-[2px] bg-black mb-6" />

          {/* Hero image */}
          {post.image_path && (
            <figure className="border-2 border-black mb-8 relative">
              <div className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-black -z-10" />
              <img
                src={post.image_path}
                alt="post"
                className="w-full object-contain block"
              />
            </figure>
          )}

          {/* Body */}
          <div
            className="text-[0.85rem] leading-relaxed text-black/80 space-y-5"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            <p>{post.content}</p>
          </div>

          <div className="w-full h-[2px] bg-black mt-10 mb-6" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/50">
              End of post
            </span>
          </div>
        </div>
        {/* end left col */}

        {/* Right: Comments */}
        <div className="w-80 shrink-0 border-l-2 border-black pl-8 pt-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="block w-3 h-3 bg-black" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase">
              Comments ({comments.length})
            </span>
          </div>

          <div className="space-y-0">
            {comments.map((c, i) => (
              <div key={i} className="border-t-2 border-black py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase tracking-tight">
                    Author id: {c.user_id}
                  </span>
                  <span className="text-[9px] text-black/40 font-black tracking-widest uppercase">
                    {c.created_at}
                  </span>
                </div>
                <p
                  className="text-[0.75rem] leading-relaxed text-black/70 mb-2"
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                >
                  {c.content}
                </p>
                {/* Comment Like Button */}
                <button
                  onClick={() => handleCommentLike(i)}
                  className="flex items-center gap-1 transition-transform hover:scale-110 mt-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={c.user_liked ? "currentColor" : "none"}
                    stroke="currentColor"
                    className="w-3 h-3 text-black/60"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-[9px] font-bold text-black/50">
                    {c.like_count}
                  </span>
                </button>
              </div>
            ))}
            <div className="border-t-2 border-black" />
          </div>

          {/* Comment input */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 translate-x-[4px] translate-y-[4px] bg-black -z-10" />
            <div className="border-2 border-black">
              <textarea
                rows={3}
                placeholder="Leave a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-3 pt-3 pb-1 text-[0.75rem] bg-white outline-none resize-none placeholder:text-black/30"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              />
              <div className="border-t-2 border-black">
                <button
                  onClick={handleAddComment}
                  className="w-full bg-black text-white text-[9px] font-black tracking-[0.2em] uppercase py-2 hover:bg-gray-400 hover:text-black transition-colors duration-150"
                >
                  Post Comment →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
