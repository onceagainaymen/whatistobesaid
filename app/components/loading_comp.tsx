export default function LoadingComp() {
  // Generate consistent heights that will be the same on server and client
  const heights = [140, 180, 220, 160, 200, 250, 170, 190, 230];
  
  return (
    <div className="columns-2 sm:columns-3 gap-1 w-full">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="mb-1 break-inside-avoid">
          <div className="relative w-full bg-white border-2 border-black">
            {/* Shadow to the right */}
            <div className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-gray-400 -z-10"></div>

            {/* Image area with consistent height */}
            <div
              className="w-full bg-gray-200 border-b-2 border-black"
              style={{ height: `${heights[i]}px` }}
            ></div>

            {/* Content area */}
            <div className="px-4 pt-4 pb-5 space-y-3">
              {/* Date tick */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400"></div>
                <div className="h-2 bg-gray-200 rounded w-16"></div>
              </div>

              {/* Title */}
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>

              {/* Divider */}
              <div className="w-full h-[2px] bg-gray-200"></div>

              {/* Body text */}
              <div className="space-y-1">
                <div className="h-2 bg-gray-200 rounded w-full"></div>
                <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                <div className="h-2 bg-gray-200 rounded w-4/6"></div>
              </div>

              {/* Read more button */}
              <div className="h-6 bg-gray-200 rounded w-24 mt-2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
