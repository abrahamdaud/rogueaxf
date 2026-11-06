"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import {
  getLocalAuth,
  hasActiveSession,
  recordToUser,
} from "@/lib/local-auth";

export function Providers({ children }: { children: React.ReactNode }) {
  const {
    setUser,
    loadFeed,
    loadStories,
    setShowLoadingScreen,
    setAuthChecked,
  } = useAppStore();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        if (hasActiveSession()) {
          const record = getLocalAuth();
          if (record && mounted) {
            setUser(recordToUser(record));
          }
        } else if (mounted) {
          setUser(null);
        }

        if (mounted) {
          setAuthChecked(true);
          setShowLoadingScreen(false);
          await Promise.all([loadFeed({ silent: true }), loadStories()]);
        }
      } catch (e) {
        console.error("init error", e);
        if (mounted) {
          setAuthChecked(true);
          setShowLoadingScreen(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [setUser, loadFeed, loadStories, setShowLoadingScreen, setAuthChecked]);

  return <>{children}</>;
}
