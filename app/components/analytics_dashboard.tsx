"use client";

import { useState, useEffect } from "react";

export default function AnalyticsDashboard({ userId }: { userId: number }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch(`/api/analytics/${userId}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, [userId]);

  if (loading) {
    return (
      <div className="border-2 border-black p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-black p-4">
      <h2 className="text-sm font-black uppercase tracking-wider mb-4">
        Analytics
      </h2>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="border-2 border-black p-3">
          <p className="text-[8px] font-black uppercase tracking-wider text-black/50">
            Posts
          </p>
          <p className="text-2xl font-black">{data?.totalPosts || 0}</p>
        </div>
        <div className="border-2 border-black p-3">
          <p className="text-[8px] font-black uppercase tracking-wider text-black/50">
            Likes
          </p>
          <p className="text-2xl font-black">{data?.totalLikes || 0}</p>
        </div>
        <div className="border-2 border-black p-3">
          <p className="text-[8px] font-black uppercase tracking-wider text-black/50">
            Sentiment
          </p>
          <p className="text-2xl font-black">
            {data?.avgSentiment ? data.avgSentiment.toFixed(2) : "0"}
          </p>
        </div>
        <div className="border-2 border-black p-3">
          <p className="text-[8px] font-black uppercase tracking-wider text-black/50">
            Hot
          </p>
          <p className="text-2xl font-black">{data?.hotPosts || 0}</p>
        </div>
      </div>

      {/* Top posts */}
      <div className="mb-4">
        <h3 className="text-xs font-black uppercase tracking-wider mb-2">
          Top Posts
        </h3>
        {data?.topPosts?.length > 0 ? (
          <div className="space-y-1">
            {data.topPosts.map((post: any) => (
              <div
                key={post.id}
                className="flex justify-between border-b border-black/10 py-1 text-sm"
              >
                <span className="truncate max-w-[60%]">
                  {post.title || "Untitled"}
                </span>
                <div className="flex gap-4">
                  <span>{post.like_count}</span>
                  <span>{post.score ? post.score.toFixed(2) : "0"}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-black/30">No posts yet</p>
        )}
      </div>

      {/* Controversial */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider mb-2">
          Controversial
        </h3>
        {data?.controversial?.length > 0 ? (
          <div className="space-y-1">
            {data.controversial.map((post: any) => (
              <div
                key={post.id}
                className="flex justify-between border-b border-black/10 py-1 text-sm"
              >
                <span className="truncate max-w-[60%]">
                  {post.title || "Untitled"}
                </span>
                <div className="flex gap-4">
                  <span>❤️ {post.like_count}</span>
                  <span className="text-red-500">
                    📊 {post.score ? post.score.toFixed(2) : "0"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-black/30">No controversial posts</p>
        )}
      </div>
    </div>
  );
}
