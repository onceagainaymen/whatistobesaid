import { useEffect, useState } from "react";

export default function PostCard({
  post,
  initiallikeCount = 0,
  initialLiked = false,
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initiallikeCount);
  const isLong = post.content.length > 150;
  const preview = isLong ? post.content.slice(0, 150) : post.content;

  const handleLike = async () => {
    const res = await fetch(`/api/likes/${post.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        liked,
      }),
    });
    const data = await res.json();
    if (!res.ok) console.log(data.error);
    setLiked(!liked);
    setLikeCount(data.likeCount);
  };
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/likes/${post.id}`);
      const data = await res.json();
      setLikeCount(data.number_of_likes);
      setLiked(data.user_liked);
    })();
  }, []);
  return (
    <article className="post-card group relative w-full bg-white border-2 border-black">
      <div
        className="
          absolute inset-0 translate-x-[6px] translate-y-[6px]
          bg-black -z-10
          transition-transform duration-150 ease-out
          group-hover:translate-x-[3px] group-hover:translate-y-[3px]
        "
      />

      {post.image_path && (
        <figure className="relative w-full overflow-hidden border-b-2 border-black m-0">
          <img
            src={post.image_path}
            alt={post.title ?? "post thumbnail"}
            className="
                w-full h-auto object-cover block
                transition-transform duration-300 ease-out
                group-hover:scale-[1.03]
              "
          />
        </figure>
      )}

      <div className="px-4 pt-4 pb-5">
        {/* Category tick and like button row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="block w-3 h-3 bg-black" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/50">
              {post.date}
            </span>
          </div>

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLike();
            }}
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
            <span className="text-xs font-bold text-black/70">{likeCount}</span>
          </button>
        </div>

        {/* Title */}
        {post.title && (
          <h2
            className="
                mb-3 leading-[1.05] font-black text-black
                text-[clamp(1.1rem,4vw,1.5rem)]
                uppercase tracking-tight
              "
            style={{
              fontFamily:
                "'Arial Black', 'Haettenschweiler', Impact, sans-serif",
            }}
          >
            {post.title}
          </h2>
        )}

        {/* Divider */}
        <div className="w-full h-[2px] bg-black mb-3" />

        {/* Body */}
        <div className="relative">
          <p
            className="text-[0.78rem] leading-relaxed text-black/80 break-words"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            {preview}
            {isLong && "…"}
          </p>

          {isLong && (
            <div
              className="
                  mt-3 inline-flex items-center gap-2
                  border-2 border-black bg-black
                  px-3 py-1
                  text-white text-[10px] font-black tracking-[0.2em] uppercase
                  transition-colors duration-150
                  group-hover:bg-gray-400 group-hover:text-black
                "
            >
              <span>Read More</span>
              <span className="text-[14px] leading-none">→</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
