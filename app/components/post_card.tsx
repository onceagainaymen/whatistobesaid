type PostCardProps = {
  date?: string;
  title?: string;
  content?: string;
  image?: string;
};

export default function PostCard({ date, title, content = "", image }: PostCardProps) {
  const isLong = content.length > 150;
  const preview = isLong ? content.slice(0, 150) : content;

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

      <a href="#" className="block">
        {image && (
          <figure className="relative w-full overflow-hidden border-b-2 border-black m-0">
            <img
              src={image}
              alt={title ?? "post thumbnail"}
              className="
                w-full h-auto object-cover block
                transition-transform duration-300 ease-out
                group-hover:scale-[1.03]
              "
            />
          </figure>
        )}

        <div className="px-4 pt-4 pb-5">
          {/* Category tick */}
          <div className="flex items-center gap-2 mb-3">
            <span className="block w-3 h-3 bg-black" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/50">
            {date}
            </span>
          </div>

          {/* Title */}
          {title && (
            <h2
              className="
                mb-3 leading-[1.05] font-black text-black
                text-[clamp(1.1rem,4vw,1.5rem)]
                uppercase tracking-tight
              "
              style={{ fontFamily: "'Arial Black', 'Haettenschweiler', Impact, sans-serif" }}
            >
              {title}
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
      </a>
    </article>
  );
}
