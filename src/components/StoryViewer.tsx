"use client";

import { useEffect, useState, useCallback } from "react";
import { useAppStore } from "@/store/useAppStore";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function StoryViewer() {
  const {
    isStoryViewerOpen,
    activeStoryIndex,
    stories,
    closeStoryViewer,
    markStoryViewed,
    openStoryViewer,
  } = useAppStore();

  const [progress, setProgress] = useState(0);
  const list = stories.length > 0 ? stories : [];
  const current = list[activeStoryIndex];

  const goNext = useCallback(() => {
    if (activeStoryIndex < list.length - 1) {
      openStoryViewer(activeStoryIndex + 1);
      setProgress(0);
    } else {
      closeStoryViewer();
    }
  }, [activeStoryIndex, list.length, openStoryViewer, closeStoryViewer]);

  const goPrev = useCallback(() => {
    if (activeStoryIndex > 0) {
      openStoryViewer(activeStoryIndex - 1);
      setProgress(0);
    }
  }, [activeStoryIndex, openStoryViewer]);

  useEffect(() => {
    if (!isStoryViewerOpen || !current) return;
    markStoryViewed(current.id);
    setProgress(0);
    const duration = 5000;
    const start = Date.now();
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / duration);
      setProgress(p);
      if (p >= 1) goNext();
    };
    const id = window.setInterval(tick, 50);
    return () => clearInterval(id);
  }, [isStoryViewerOpen, current?.id, activeStoryIndex]); // eslint-disable-line

  useEffect(() => {
    if (!isStoryViewerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeStoryViewer();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isStoryViewerOpen, closeStoryViewer, goNext, goPrev]);

  return (
    <AnimatePresence>
      {isStoryViewerOpen && current && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 px-2 pt-3">
            {list.map((s, i) => (
              <div key={s.id} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full bg-white transition-[width] duration-75 ease-linear"
                  style={{
                    width:
                      i < activeStoryIndex
                        ? "100%"
                        : i === activeStoryIndex
                          ? `${progress * 100}%`
                          : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="absolute left-0 right-0 top-5 z-20 flex items-center gap-3 px-4 pt-2">
            <img
              src={current.user.avatar}
              alt=""
              className="h-8 w-8 rounded-full object-cover ring-2 ring-white/40"
            />
            <span className="flex-1 text-sm font-semibold text-white drop-shadow">
              {current.user.username}
            </span>
            <button onClick={closeStoryViewer} className="rounded-full bg-black/40 p-1.5 text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center">
            <img
              src={current.media[0]?.url}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
            <button className="absolute inset-y-0 left-0 w-1/3" onClick={goPrev} aria-label="Previous" />
            <button className="absolute inset-y-0 right-0 w-1/3" onClick={goNext} aria-label="Next" />
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center opacity-40">
            {activeStoryIndex > 0 && <ChevronLeft className="h-8 w-8 text-white" />}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center opacity-40">
            {activeStoryIndex < list.length - 1 && (
              <ChevronRight className="h-8 w-8 text-white" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
