"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SquiggleProps {
  className?: string;
  delay?: number;
}

/** Hand-drawn underline that draws itself when scrolled into view. */
export function Squiggle({ className, delay = 0.2 }: SquiggleProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      fill="none"
      className={cn("pointer-events-none absolute -bottom-[0.18em] left-0 h-[0.32em] w-full overflow-visible", className)}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.path
        d="M3 12 C 30 3, 52 19, 82 10 S 132 3, 160 12 S 188 16, 197 7"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 0.7, ease: easeOut, delay } },
        }}
      />
    </motion.svg>
  );
}

interface HighlightWordProps {
  children: ReactNode;
  className?: string;
}

export function HighlightWord({ children, className }: HighlightWordProps) {
  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      {children}
      <Squiggle className="text-sunny" />
    </span>
  );
}
