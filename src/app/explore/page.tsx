"use client";

import { useAppStore } from "@/store/useAppStore";
import { Search } from "lucide-react";
import { useState } from "react";

export default function ExplorePage() {
  const { posts } = useAppStore();
  const [query, setQuery] = useState("");
  const filtered = posts.filter(
    (p) =>
      p.caption.toLowerCase().includes(query.toLowerCase()) ||
      p.user.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-40 border-b border-zinc-900/80 bg-black/90 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2 rounded-xl bg-zinc-900 px-3 py-2.5">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari"
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </div>
      </header>
      <div className="grid grid-cols-3 gap-0.5">
        {filtered.map((post) => (
          <div key={post.id} className="relative aspect-square bg-zinc-900">
            {post.media[0] && (
              <img src={post.media[0].url} alt="" className="h-full w-full object-cover" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
