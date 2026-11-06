"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { ChevronLeft, Send } from "lucide-react";
import { timeAgo, cn } from "@/lib/utils";

type Bubble = { id: string; text: string; isOwn: boolean; createdAt: string };

export default function ChatDetailPage() {
  const params = useParams();
  const id = String(params.id ?? "");
  const router = useRouter();
  const { conversations, markConversationRead, sendMessage, ensureGuestUser } = useAppStore();
  const [text, setText] = useState("");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const conv = useMemo(() => conversations.find((c) => c.id === id), [conversations, id]);

  useEffect(() => {
    if (!conv) return;
    markConversationRead(conv.id);
    setBubbles([
      {
        id: conv.lastMessage.id,
        text: conv.lastMessage.text,
        isOwn: conv.lastMessage.isOwn,
        createdAt: conv.lastMessage.createdAt,
      },
    ]);
  }, [conv?.id]); // eslint-disable-line

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [bubbles]);

  if (!conv) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8">
        <p className="text-zinc-500">Percakapan tidak ditemukan</p>
        <button onClick={() => router.push("/messages")} className="text-sm text-blue-400">Kembali</button>
      </div>
    );
  }

  const handleSend = () => {
    if (!text.trim()) return;
    ensureGuestUser();
    setBubbles((b) => [
      ...b,
      { id: `b-${Date.now()}`, text: text.trim(), isOwn: true, createdAt: new Date().toISOString() },
    ]);
    sendMessage(conv.id, text.trim());
    setText("");
  };

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col">
      <header className="flex items-center gap-3 border-b border-zinc-900 px-3 py-2.5">
        <button onClick={() => router.push("/messages")} className="text-white">
          <ChevronLeft className="h-7 w-7" />
        </button>
        <img src={conv.user.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{conv.user.username}</p>
          <p className="text-[11px] text-zinc-500">{conv.isOnline ? "Aktif sekarang" : "Offline"}</p>
        </div>
      </header>
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {bubbles.map((b) => (
          <div key={b.id} className={cn("flex", b.isOwn ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm",
                b.isOwn
                  ? "rounded-br-md bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white"
                  : "rounded-bl-md bg-zinc-800 text-zinc-100"
              )}
            >
              <p>{b.text}</p>
              <p className={cn("mt-1 text-[10px]", b.isOwn ? "text-white/70" : "text-zinc-500")}>
                {timeAgo(b.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center gap-2 border-t border-zinc-900 px-3 py-2.5">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Pesan..."
          className="flex-1 rounded-full bg-zinc-900 px-4 py-2.5 text-sm outline-none"
        />
        <button onClick={handleSend} disabled={!text.trim()} className="rounded-full bg-blue-500 p-2.5 text-white disabled:opacity-40">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
