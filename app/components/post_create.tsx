import { useEffect, useState } from "react";
import Editor from "@/components/Editor";

interface Draft {
  title: string;
  content: string;
  image: string;
}

export default function PostCreate({ session }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);

  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImage(null);
    setPreview(null);
  }

  async function handleSubmit(status: "draft" | "published") {
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("id", session.id);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("status", status);
    if (image) formData.append("image", image);
    const res = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
      return;
    }

    window.location.href = "/";
  }

  useEffect(() => {
    let isMounted = true;
    const fetch_draft = async function () {
      try {
        const res = await fetch(`/api/posts/${session.id}/draft/`);
        const data = await res.json();
        if (data.result[0] && isMounted) {
          let d: Draft = {
            title: data.result[0].title,
            content: data.result[0].content || "",
            image: data.result[0].image_path || "",
          };
          setDraft(d);
          setTitle(d.title);
          setContent(d.content);
          setPreview(d.image);

          let imageFile = null;
          if (data.result[0].image_path) {
            const blob = await (await fetch(data.result[0].image_path)).blob();
            imageFile = new File(
              [blob],
              data.result[0].image_path.split("/").pop(),
              { type: blob.type },
            );
          }
          setImage(imageFile);

          const res_d = await fetch(`/api/posts/${session.id}/draft/`, {
            method: "DELETE",
          });
        }
      } catch (e) {
        console.error("failed to process draft:" + e);
      }
    };
    fetch_draft();
    return () => {
      isMounted = false;
    };
  }, []);

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

            <div className="flex flex-col gap-1 py-6">
              <label
                className="text-[9px] tracking-[0.2em] uppercase text-black/40"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                Content
              </label>
              <Editor content={content} onChange={setContent} />
            </div>

            {/* Image upload */}
            <div className="flex flex-col gap-3 pt-6">
              <label
                className="text-[9px] tracking-[0.2em] uppercase text-black/40"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                Image
              </label>

              {preview ? (
                <div className="relative border-2 border-black">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full object-cover max-h-64"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black text-white text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1 hover:bg-red-700 transition-colors duration-150"
                    style={{ fontFamily: "'Courier New', Courier, monospace" }}
                  >
                    Remove ✕
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <div className="border-2 border-dashed border-black/30 hover:border-black flex flex-col items-center justify-center py-10 gap-2 transition-colors duration-150">
                    <span
                      className="text-3xl font-black text-black/20"
                      style={{
                        fontFamily: "'Arial Black', Impact, sans-serif",
                      }}
                    >
                      +
                    </span>
                    <span
                      className="text-[9px] tracking-[0.2em] uppercase text-black/30"
                      style={{
                        fontFamily: "'Courier New', Courier, monospace",
                      }}
                    >
                      Click to upload
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>
              )}
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
                disabled={loading || (!title && !draft?.title)}
                className="text-[11px] font-black tracking-[0.2em] uppercase text-black/30 hover:text-black border-b border-black/15 hover:border-black pb-0.5 transition-all duration-200 disabled:opacity-20"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                Save Draft
              </button>

              <span className="text-black/20">|</span>

              <button
                onClick={() => handleSubmit("published")}
                disabled={loading || (!title && !draft?.title)}
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
