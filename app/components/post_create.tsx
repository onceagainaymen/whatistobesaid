"use client";

import { useState } from "react";

export default function PostCreate({ session }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(status: "draft" | "published") {
    setError("");
    setLoading(true);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: session.id, title, content, status }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
      return;
    }

    window.location.href = "/";
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div className="relative p-2">
        <div className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-black -z-10" />
        <div className="border-2 border-black bg-white">
          {/* Header */}
          <div className="border-b-2 border-black px-6 py-4 flex items-center gap-3">
            <span className="block w-3 h-3 bg-black" />
            <span
              className="text-[10px] font-black tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              New Post
            </span>
          </div>

          {/* Fields */}
          <div className="p-6 flex flex-col divide-y divide-black border-b-2 border-black">
            <div className="flex flex-col gap-1 pb-6">
              <label
                className="text-[9px] tracking-[0.2em] uppercase text-black/40"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                Title
              </label>
              <input
                type="text"
                placeholder="What is to be said?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-transparent outline-none text-2xl font-black uppercase tracking-tight placeholder:text-black/20"
                style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
              />
            </div>

            <div className="flex flex-col gap-1 pt-6">
              <label
                className="text-[9px] tracking-[0.2em] uppercase text-black/40"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                Content
              </label>
              <textarea
                rows={10}
                placeholder="Say it."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-transparent outline-none resize-none text-sm leading-relaxed placeholder:text-black/20"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              className="px-6 pt-4 text-xs text-red-700"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="px-6 py-4 flex items-center justify-between">
            <span
              className="text-[9px] tracking-[0.2em] uppercase text-black/30"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              {content.length} / 1500
            </span>

            <div className="flex items-center gap-6">
              <button
                onClick={() => handleSubmit("draft")}
                disabled={loading || !title}
                className="text-[11px] font-black tracking-[0.2em] uppercase text-black/30 hover:text-black border-b border-black/15 hover:border-black pb-0.5 transition-all duration-200 disabled:opacity-20"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                Save Draft
              </button>

              <span className="text-black/20">|</span>

              <button
                onClick={() => handleSubmit("published")}
                disabled={loading || !title || !content}
                className="bg-black text-white text-[11px] font-black tracking-[0.2em] uppercase px-5 py-2 hover:bg-gray-400 hover:text-black transition-colors duration-150 disabled:opacity-20"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                {loading ? "..." : "Publish →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
