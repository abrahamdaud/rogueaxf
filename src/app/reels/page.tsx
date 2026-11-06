"use client";

import { useAppStore } from "@/store/useAppStore";
import { Heart, MessageCircle, Send } from "lucide-react";
import { formatCount } from "@/lib/utils";
import { useMemo, useState } from "react";

export default function ReelsPage() {
  const { posts, toggleLike } = useAppStore();
  const reels = useMemo(() => posts.filter((p) => p.media.length > 0).slice(0, 8), [posts]);
  const [active, setActive] = useState(0);
  const current = reels[active];

  if (!current) {
    return (
      <div className="flex h-[calc(100vh-56px)] items-center justify-center text-sm text-zinc-500">
        Belum ada reel
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-56px)] overflow-hidden bg-black">
      <img src={current.media[0].url} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      <div className="absolute bottom-24 right-3 flex flex-col items-center gap-5">
        <button onClick={() => toggleLike(current.id)} className="flex flex-col items-center gap-1">
          <Heart className={`h-7 w-7 ${current.isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
          <span className="text-xs text-white">{formatCount(current.likesCount)}</span>
        </button>
        <MessageCircle className="h-7 w-7 -scale-x-100 text-white" />
        <Send className="h-7 w-7 text-white" />
      </div>
      <div className="absolute bottom-4 left-0 right-16 px-4">
        <p className="text-sm font-semibold text-white">{current.user.username}</p>
        <p className="line-clamp-2 text-sm text-white">{current.caption}</p>
      </div>
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        {reels.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 w-1.5 rounded-full ${i === active ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
