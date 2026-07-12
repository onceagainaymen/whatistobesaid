// components/Editor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { InputRule } from "@tiptap/core";

interface EditorProps {
  content?: string;
  onChange?: (html: string) => void;
}

export default function Editor({ content = "", onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        inputRules: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="border-2 border-black bg-white">
      <style>{`
        .tiptap {
          min-height: 200px;
          padding: 1rem;
          outline: none;
        }
        .tiptap:focus {
          outline: none;
        }
        .tiptap h1 {
          font-size: 2rem;
          font-weight: 800;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .tiptap h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .tiptap h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .tiptap blockquote {
          border-left: 4px solid black;
          padding-left: 1rem;
          margin: 0.5rem 0;
          font-style: italic;
          color: #4a4a4a;
        }
        .tiptap ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .tiptap ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .tiptap p {
          margin: 0.25rem 0;
        }
        .tiptap strong {
          font-weight: 700;
        }
        .tiptap em {
          font-style: italic;
        }
      `}</style>
      <EditorContent editor={editor} className="w-full prose max-w-none" />
    </div>
  );
}
