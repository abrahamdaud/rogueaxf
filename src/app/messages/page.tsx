"use client";

import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { timeAgo } from "@/lib/utils";
import { ChevronLeft, Edit } from "lucide-react";

export default function MessagesPage() {
  const { conversations, markConversationRead } = useAppStore();

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-zinc-900/80 bg-black/90 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white"><ChevronLeft className="h-7 w-7" /></Link>
          <h1 className="text-base font-semibold">Pesan</h1>
        </div>
        <Edit className="h-5 w-5 text-white" />
      </header>
      <div className="flex-1">
        {conversations.length === 0 && (
          <p className="py-16 text-center text-sm text-zinc-500">Belum ada pesan</p>
        )}
        {conversations.map((c) => (
          <Link
            key={c.id}
            href={`/messages/${c.id}`}
            onClick={() => markConversationRead(c.id)}
            className="flex items-center gap-3 border-b border-zinc-900/50 px-4 py-3"
          >
            <img src={c.user.avatar} alt="" className="h-14 w-14 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{c.user.username}</p>
                <p className="text-[11px] text-zinc-500">{timeAgo(c.lastMessage.createdAt)}</p>
              </div>
              <p className={`truncate text-sm ${c.unreadCount > 0 ? "font-medium text-white" : "text-zinc-500"}`}>
                {c.lastMessage.text}
              </p>
            </div>
            {c.unreadCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1.5 text-[10px] font-bold text-white">
                {c.unreadCount}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
