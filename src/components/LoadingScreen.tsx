"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { useAppStore } from "@/store/useAppStore";

export function LoadingScreen() {
  const { showLoadingScreen, setShowLoadingScreen } = useAppStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!showLoadingScreen) return;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowLoadingScreen(false), 400);
          return 100;
        }
        return p + Math.random() * 18 + 6;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [showLoadingScreen, setShowLoadingScreen]);

  return (
    <AnimatePresence>
      {showLoadingScreen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, rgba(220,39,67,0.4) 0%, transparent 60%)",
              }}
              animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10">
            <Logo size="lg" animated />

            <div className="w-48 space-y-3">
              <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-900">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-center text-xs tracking-wide text-zinc-500">
                {progress < 100 ? "Memuat RogueAXF..." : "Siap"}
              </p>
            </div>
          </div>

          <p className="absolute bottom-10 text-[11px] uppercase tracking-widest text-zinc-600">
            Startup by Rogue — ARF
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
