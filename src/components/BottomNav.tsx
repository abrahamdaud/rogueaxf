"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusSquare, Clapperboard, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

const tabs = [
  { id: "home", href: "/", icon: Home, label: "Beranda" },
  { id: "explore", href: "/explore", icon: Search, label: "Jelajahi" },
  { id: "create", href: "/create", icon: PlusSquare, label: "Buat" },
  { id: "reels", href: "/reels", icon: Clapperboard, label: "Reels" },
  { id: "profile", href: "/profile", icon: User, label: "Profil" },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useAppStore();

  if (pathname === "/login") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800/80 bg-black/95 backdrop-blur-md safe-area-bottom">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-around px-2">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="relative flex h-full w-16 flex-col items-center justify-center"
              aria-label={tab.label}
            >
              {tab.id === "profile" && user ? (
                <div
                  className={cn(
                    "h-6 w-6 overflow-hidden rounded-full ring-2 transition-all",
                    isActive ? "ring-white" : "ring-transparent"
                  )}
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <Icon
                  className={cn(
                    "h-[26px] w-[26px] transition-colors",
                    isActive ? "text-white" : "text-zinc-500"
                  )}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  fill={isActive && tab.id === "home" ? "currentColor" : "none"}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
