"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
  showText?: boolean;
}

const sizes = {
  sm: { icon: 28, text: "text-lg" },
  md: { icon: 40, text: "text-xl" },
  lg: { icon: 64, text: "text-3xl" },
};

export function Logo({ size = "md", animated = true, className, showText = true }: LogoProps) {
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <motion.div
        className="relative flex items-center justify-center"
        style={{ width: s.icon, height: s.icon }}
        initial={animated ? { scale: 0.6, opacity: 0, rotate: -20 } : false}
        animate={animated ? { scale: 1, opacity: 1, rotate: 0 } : false}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
          }}
          animate={animated ? { rotate: 360 } : false}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-[2px] flex items-center justify-center overflow-hidden rounded-full bg-black">
          <span
            className="font-black tracking-tighter text-white"
            style={{ fontSize: s.icon * 0.42 }}
          >
            RX
          </span>
        </div>
      </motion.div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-bold tracking-tight text-white", s.text)}>
            Rogue
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              AXF
            </span>
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            by Rogue — ARF
          </span>
        </div>
      )}
    </div>
  );
}
