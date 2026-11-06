"use client";

import { LoadingScreen } from "./LoadingScreen";
import { BottomNav } from "./BottomNav";
import { StoryViewer } from "./StoryViewer";

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <div className="mx-auto flex min-h-screen max-w-lg flex-col pb-14">
        {children}
      </div>
      <BottomNav />
      <StoryViewer />
    </>
  );
}
