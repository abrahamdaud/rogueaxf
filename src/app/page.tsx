"use client";

import { useEffect } from "react";
import { StoriesBar } from "@/components/StoriesBar";
import { PostCard } from "@/components/PostCard";
import { useAppStore } from "@/store/useAppStore";
import { Logo } from "@/components/Logo";
import { Heart, MessageCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const {
    posts,
    feedLoading,
    feedError,
    loadFeed,
    loadStories,
    isAuthenticated,
    authChecked,
  } = useAppStore();

  useEffect(() => {
    if (authChecked) {
      loadFeed();
      loadStories();
    }
  }, [authChecked, loadFeed, loadStories]);

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-zinc-900/80 bg-black/90 px-4 py-3 backdrop-blur-md">
        <Logo size="sm" animated={false} />
        <div className="flex items-center gap-5">
          <Link href="/donate" className="text-pink-400" title="Donate">
            <Heart className="h-6 w-6" strokeWidth={1.8} fill="currentColor" />
          </Link>
          <Link href="/notifications" className="relative text-white">
            <Heart className="h-6 w-6" strokeWidth={1.8} />
          </Link>
          <Link href="/messages" className="relative text-white">
            <MessageCircle className="h-6 w-6 -scale-x-100" strokeWidth={1.8} />
          </Link>
        </div>
      </header>

      <StoriesBar />

      <main className="flex-1">
        {feedLoading && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-zinc-500">
            <RefreshCw className="h-8 w-8 animate-spin" />
            <p className="text-sm">Memuat feed...</p>
          </div>
        )}

        {feedError && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <p className="text-sm text-red-400">{feedError}</p>
            <button
              onClick={() => loadFeed()}
              className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white"
            >
              Coba lagi
            </button>
          </div>
        )}

        {!feedLoading && !feedError && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-zinc-700">
              <Heart className="h-7 w-7 text-zinc-500" />
            </div>
            <div>
              <p className="text-base font-semibold text-white">Belum ada postingan</p>
              <p className="mt-1 text-sm text-zinc-500">
                {isAuthenticated
                  ? "Jadilah yang pertama membagikan momen di RogueAXF."
                  : "Login untuk melihat feed dan membuat postingan."}
              </p>
            </div>
            {!isAuthenticated && (
              <div className="mt-2 flex flex-col items-center gap-2">
                <Link href="/create" className="rounded-xl bg-zinc-800 px-6 py-2.5 text-sm font-semibold text-white">
                  Buat postingan
                </Link>
                <Link href="/login" className="text-sm text-zinc-500 hover:text-zinc-300">
                  Opsional: set password & signature
                </Link>
                <Link href="/donate" className="text-sm font-medium text-pink-400 hover:text-pink-300">
                  ❤️ Dukung Rogue — ARF
                </Link>
              </div>
            )}
            {isAuthenticated && (
              <Link href="/create" className="mt-2 rounded-xl bg-zinc-800 px-6 py-2.5 text-sm font-semibold text-white">
                Buat postingan
              </Link>
            )}
          </div>
        )}

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
}
