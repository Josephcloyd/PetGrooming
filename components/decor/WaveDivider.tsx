"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/* Both waves share the same command structure so Motion can morph between them. */
const WAVE_A = "M0 40 C 240 0 480 80 720 40 C 960 0 1200 80 1440 40 L 1440 80 L 0 80 Z";
const WAVE_B = "M0 40 C 240 80 480 0 720 40 C 960 80 1200 0 1440 40 L 1440 80 L 0 80 Z";

type Tone = "cream" | "white" | "navy";

const backgrounds: Record<Tone, string> = { cream: "bg-cream", white: "bg-white", navy: "bg-navy" };
const fills: Record<Tone, string> = { cream: "text-cream", white: "text-white", navy: "text-navy" };

interface WaveDividerProps {
  from: Tone;
  to: Tone;
  className?: string;
}

/** A gently sloshing waterline between two section colours. */
export function WaveDivider({ from, to, className }: WaveDividerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className={cn("relative -mb-px h-12 sm:h-20", backgrounds[from], className)}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={cn("absolute inset-0 h-full w-full", fills[to])}>
        <motion.path
          fill="currentColor"
          fillOpacity={0.45}
          d={WAVE_B}
          animate={reduceMotion ? undefined : { d: [WAVE_B, WAVE_A, WAVE_B] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          fill="currentColor"
          d={WAVE_A}
          animate={reduceMotion ? undefined : { d: [WAVE_A, WAVE_B, WAVE_A] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
