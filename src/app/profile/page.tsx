"use client";

import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { formatCount } from "@/lib/utils";
import { Menu, Grid3X3 } from "lucide-react";

export default function ProfilePage() {
  const { user, posts, ensureGuestUser } = useAppStore();
  const profile = user ?? {
    id: "guest",
    username: "tamu_rogue",
    fullName: "Tamu RogueAXF",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rogueaxf",
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
    bio: "Mode tamu",
  };

  const myPosts = posts.filter((p) => p.user.id === profile.id || p.id.startsWith("local-") || p.id.startsWith("mock-"));

  return (
    <div className="flex flex-col pb-4">
      <header className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-semibold">{profile.username}</h1>
        <Menu className="h-6 w-6" />
      </header>
      <div className="flex items-center gap-6 px-4 py-3">
        <img src={profile.avatar} alt="" className="h-20 w-20 rounded-full object-cover ring-2 ring-zinc-800" />
        <div className="flex flex-1 justify-around text-center">
          <div><p className="font-semibold">{formatCount(myPosts.length)}</p><p className="text-xs text-zinc-500">postingan</p></div>
          <div><p className="font-semibold">{formatCount(profile.followersCount)}</p><p className="text-xs text-zinc-500">pengikut</p></div>
          <div><p className="font-semibold">{formatCount(profile.followingCount)}</p><p className="text-xs text-zinc-500">mengikuti</p></div>
        </div>
      </div>
      <div className="px-4 pb-3">
        <p className="text-sm font-semibold">{profile.fullName}</p>
        {profile.bio && <p className="text-sm text-zinc-300">{profile.bio}</p>}
        <div className="mt-3 flex gap-2">
          <button onClick={() => ensureGuestUser()} className="flex-1 rounded-lg bg-zinc-800 py-1.5 text-sm font-semibold">Edit profil</button>
          <Link href="/donate" className="flex-1 rounded-lg border border-pink-500/40 bg-pink-500/10 py-1.5 text-center text-sm font-semibold text-pink-300">Donate</Link>
        </div>
      </div>
      <div className="flex border-y border-zinc-900">
        <button className="flex flex-1 items-center justify-center border-b-2 border-white py-2"><Grid3X3 className="h-5 w-5" /></button>
      </div>
      <div className="grid grid-cols-3 gap-0.5">
        {myPosts.map((p) => (
          <div key={p.id} className="aspect-square bg-zinc-900">
            {p.media[0] && <img src={p.media[0].url} alt="" className="h-full w-full object-cover" />}
          </div>
        ))}
      </div>
    </div>
  );
}
