"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Check, Heart } from "lucide-react";
import { DONATE_WALLETS } from "@/lib/donate";
import { Logo } from "@/components/Logo";

export default function DonatePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyAddress = async (id: string, address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch { /* ignore */ }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black pb-20">
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-zinc-900/80 bg-black/90 px-4 py-3 backdrop-blur-md">
        <Link href="/" className="text-white"><ChevronLeft className="h-7 w-7" /></Link>
        <h1 className="text-base font-semibold">Dukung RogueAXF</h1>
      </header>
      <div className="mx-auto w-full max-w-lg px-4 py-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600">
            <Heart className="h-8 w-8 text-white" fill="currentColor" />
          </div>
          <Logo size="sm" animated={false} showText />
          <p className="mt-4 max-w-sm text-sm text-zinc-400">
            Donasi kripto membantu pengembangan. Startup by <span className="font-semibold text-white">Rogue — ARF</span>.
          </p>
        </div>
        <div className="space-y-3">
          {DONATE_WALLETS.map((w) => (
            <div key={w.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: w.color }}>
                  {w.symbol.slice(0, 3)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{w.name}</p>
                  <p className="text-[11px] text-zinc-500">{w.network}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-black/50 px-3 py-2.5">
                <code className="flex-1 break-all font-mono text-[11px] text-zinc-300">{w.address}</code>
                <button onClick={() => copyAddress(w.id, w.address)} className="rounded-lg bg-zinc-800 px-3 py-2 text-xs font-semibold text-white">
                  {copiedId === w.id ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
