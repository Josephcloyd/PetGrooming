"use client";

import { PawPrint } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Shape = {
  kind: "bubble" | "paw";
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  rotate?: number;
};

/* Fixed positions so server and client render identically (no hydration mismatch). */
const defaultShapes: Shape[] = [
  { kind: "bubble", left: "6%", top: "18%", size: 48, duration: 7, delay: 0 },
  { kind: "paw", left: "14%", top: "70%", size: 28, duration: 6, delay: 0.8, rotate: -20 },
  { kind: "bubble", left: "28%", top: "8%", size: 22, duration: 5.5, delay: 1.2 },
  { kind: "bubble", left: "52%", top: "82%", size: 64, duration: 8, delay: 0.4 },
  { kind: "paw", left: "68%", top: "12%", size: 34, duration: 6.5, delay: 1.6, rotate: 15 },
  { kind: "bubble", left: "84%", top: "40%", size: 36, duration: 7.5, delay: 0.2 },
  { kind: "paw", left: "92%", top: "74%", size: 24, duration: 5, delay: 2, rotate: 30 },
  { kind: "bubble", left: "40%", top: "48%", size: 18, duration: 6, delay: 1 },
];

interface FloatingShapesProps {
  shapes?: Shape[];
  className?: string;
}

/** Decorative bubbles and paw prints that gently bob in the background. */
export function FloatingShapes({ shapes = defaultShapes, className }: FloatingShapesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {shapes.map((shape, index) => (
        <motion.span
          key={index}
          className="absolute block"
          style={{ left: shape.left, top: shape.top, width: shape.size, height: shape.size }}
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -14, 0], x: [0, 6, 0], rotate: [shape.rotate ?? 0, (shape.rotate ?? 0) + 8, shape.rotate ?? 0] }
          }
          transition={{ duration: shape.duration, delay: shape.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {shape.kind === "bubble" ? (
            <span className="block h-full w-full rounded-full border border-white/70 bg-gradient-to-br from-sky/70 to-white/30 shadow-inner" />
          ) : (
            <PawPrint className="h-full w-full text-coral/30" strokeWidth={1.5} />
          )}
        </motion.span>
      ))}
    </div>
  );
}
