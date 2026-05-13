const comments = [
  { author: "Jane D.", date: "12 May 2026", body: "This is a great read, really changed my perspective on design trends." },
  { author: "Mark T.", date: "11 May 2026", body: "Brutalism is making a serious comeback and I'm here for it." },
  { author: "Sara K.", date: "10 May 2026", body: "Interesting take. I'd argue minimalism never really died though." },
];

export default function PostPage({post}) {
  return (
    <main className="min-h-screen bg-white">
    <div className="flex items-start max-w-6xl mx-auto px-6 py-12 gap-8">

      {/* Left: Post content */}
      <div className="flex-1 min-w-0">

      {/* Meta */}
      <div className="flex items-center gap-2 mb-4">
        <span className="block w-3 h-3 bg-black" />
        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/50">
        {post.date}
        </span>
      </div>

      {/* Title */}
      <h1
        className="text-[clamp(2rem,8vw,3.5rem)] font-black uppercase tracking-tight leading-[1.0] mb-6"
        style={{ fontFamily: "'Arial Black', 'Haettenschweiler', Impact, sans-serif" }}
      >
      {post.title}
      </h1>

      <div className="w-full h-[2px] bg-black mb-6" />

      {/* Hero image */}
      {post.image &&
      <figure className="border-2 border-black mb-8 relative">
        <div className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-black -z-10" />
        <img src={post.image} alt="post" className="w-full object-contain block" />
      </figure>
      }

      {/* Body */}
      <div
        className="text-[0.85rem] leading-relaxed text-black/80 space-y-5"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        <p>
        {post.content}
        </p>
      </div>

      <div className="w-full h-[2px] bg-black mt-10 mb-6" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/50">End of post</span>
      </div>

      </div>{/* end left col */}

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
                <span className="text-[11px] font-black uppercase tracking-tight">{c.author}</span>
                <span className="text-[9px] text-black/40 font-black tracking-widest uppercase">{c.date}</span>
              </div>
              <p className="text-[0.75rem] leading-relaxed text-black/70"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                {c.body}
              </p>
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
              className="w-full px-3 pt-3 pb-1 text-[0.75rem] bg-white outline-none resize-none placeholder:text-black/30"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            />
            <div className="border-t-2 border-black">
              <button className="w-full bg-black text-white text-[9px] font-black tracking-[0.2em] uppercase py-2 hover:bg-gray-400 hover:text-black transition-colors duration-150">
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
