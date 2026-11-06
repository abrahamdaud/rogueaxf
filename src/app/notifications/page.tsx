"use client";

import { notifications } from "@/lib/mock-data";
import { timeAgo } from "@/lib/utils";
import { ChevronLeft, Heart, UserPlus, MessageCircle } from "lucide-react";
import Link from "next/link";

const iconMap = {
  like: Heart,
  follow: UserPlus,
  comment: MessageCircle,
  mention: MessageCircle,
  repost: Heart,
  story_view: Heart,
};

export default function NotificationsPage() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-zinc-900/80 bg-black/90 px-4 py-3 backdrop-blur-md">
        <Link href="/" className="text-white">
          <ChevronLeft className="h-7 w-7" />
        </Link>
        <h1 className="text-base font-semibold">Notifikasi</h1>
      </header>

      <div className="flex-1">
        {notifications.map((n) => {
          const Icon = iconMap[n.type] || Heart;
          return (
            <div
              key={n.id}
              className="flex items-center gap-3 border-b border-zinc-900/50 px-4 py-3"
            >
              <div className="relative shrink-0">
                <img
                  src={n.user.avatar}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 ring-2 ring-black">
                  <Icon className="h-2.5 w-2.5 text-white" fill="currentColor" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-white">
                  <span className="font-semibold">{n.user.username}</span>{" "}
                  {n.type === "like" && "menyukai postingan Anda"}
                  {n.type === "follow" && "mulai mengikuti Anda"}
                  {n.type === "comment" && `berkomentar: ${n.text}`}
                </p>
                <p className="text-xs text-zinc-500">{timeAgo(n.createdAt)}</p>
              </div>
              {n.post && (
                <img
                  src={n.post.media[0].url}
                  alt=""
                  className="h-11 w-11 shrink-0 rounded object-cover"
                />
              )}
              {n.type === "follow" && (
                <button className="shrink-0 rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white">
                  Ikuti
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
