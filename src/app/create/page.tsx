"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Image as ImageIcon } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import type { Post } from "@/types";

export default function CreatePage() {
  const router = useRouter();
  const { ensureGuestUser, addLocalPost } = useAppStore();
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const publish = () => {
    if (!preview) return;
    setUploading(true);
    const user = ensureGuestUser();
    const post: Post = {
      id: `local-${Date.now()}`,
      user,
      media: [{ id: `lm-${Date.now()}`, type: "image", url: preview }],
      caption,
      hashtags: caption.match(/#[a-zA-Z0-9_]+/g)?.map((h) => h.slice(1).toLowerCase()) ?? [],
      mentions: [],
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: false,
      isSaved: false,
      comments: [],
      createdAt: new Date().toISOString(),
      type: "post",
    };
    addLocalPost(post);
    setUploading(false);
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <header className="flex items-center justify-between border-b border-zinc-900 px-4 py-3">
        <Link href="/" className="text-white"><ChevronLeft className="h-7 w-7" /></Link>
        <h1 className="text-base font-semibold">Buat postingan</h1>
        <button
          onClick={publish}
          disabled={!preview || uploading}
          className="text-sm font-semibold text-blue-400 disabled:opacity-40"
        >
          {uploading ? "..." : "Bagikan"}
        </button>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <button
          onClick={() => fileRef.current?.click()}
          className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900"
        >
          {preview ? (
            <img src={preview} alt="" className="h-full w-full rounded-xl object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-zinc-500">
              <ImageIcon className="h-10 w-10" />
              <span className="text-sm">Pilih foto</span>
            </div>
          )}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Tulis caption... #hashtag"
          rows={4}
          className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600"
        />
      </div>
    </div>
  );
}
