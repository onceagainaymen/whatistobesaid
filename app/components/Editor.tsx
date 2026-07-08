// components/Editor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface EditorProps {
  content?: string;
  onChange?: (html: string) => void;
}

export default function Editor({ content = "", onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
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
      `}</style>
      <EditorContent editor={editor} className="w-full prose max-w-none" />
    </div>
  );
}
