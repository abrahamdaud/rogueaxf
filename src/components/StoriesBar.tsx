"use client";

import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export function StoriesBar() {
  const { stories, user, openStoryViewer } = useAppStore();

  return (
    <div className="border-b border-zinc-900 px-3 py-3">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
        {user && (
          <button
            className="flex shrink-0 flex-col items-center gap-1.5"
            onClick={() => openStoryViewer(0)}
          >
            <div className="relative">
              <div className="h-[66px] w-[66px] overflow-hidden rounded-full bg-zinc-900 ring-2 ring-zinc-700">
                <img
                  src={user.avatar}
                  alt="Your story"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 ring-2 ring-black">
                <Plus className="h-3 w-3 text-white" strokeWidth={3} />
              </div>
            </div>
            <span className="max-w-[66px] truncate text-[11px] text-zinc-300">
              Cerita Anda
            </span>
          </button>
        )}

        {stories
          .filter((s) => s.user.id !== user?.id)
          .map((story, idx) => (
            <button
              key={story.id}
              className="flex shrink-0 flex-col items-center gap-1.5"
              onClick={() => openStoryViewer(idx + 1)}
            >
              <div
                className={cn(
                  "rounded-full p-[2.5px]",
                  story.viewed
                    ? "bg-zinc-700"
                    : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
                )}
              >
                <div className="h-[62px] w-[62px] overflow-hidden rounded-full bg-black p-[2px]">
                  <img
                    src={story.user.avatar}
                    alt={story.user.username}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="max-w-[66px] truncate text-[11px] text-zinc-300">
                {story.user.username}
              </span>
            </button>
          ))}
      </div>
    </div>
  );
}
