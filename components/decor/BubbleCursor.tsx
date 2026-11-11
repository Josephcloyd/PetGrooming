"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";

type Bubble = { id: number; x: number; y: number; size: number; drift: number };

const MAX_BUBBLES = 18;
const SPAWN_INTERVAL_MS = 45;
const RISE_PX = 110;

interface BubbleCursorProps {
  targetRef: RefObject<HTMLElement | null>;
}

/**
 * Soap bubbles trail the mouse pointer inside `targetRef`, float up and pop.
 * Mouse only (no touch), and disabled for reduced-motion users.
 */
export function BubbleCursor({ targetRef }: BubbleCursorProps) {
  const reduceMotion = useReducedMotion();
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const nextId = useRef(0);
  const lastSpawn = useRef(0);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || reduceMotion) return;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const now = performance.now();
      if (now - lastSpawn.current < SPAWN_INTERVAL_MS) return;
      lastSpawn.current = now;

      const rect = target.getBoundingClientRect();
      const bubble: Bubble = {
        id: nextId.current++,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        size: 8 + Math.random() * 18,
        drift: (Math.random() - 0.5) * 40,
      };
      setBubbles((current) => [...current.slice(-(MAX_BUBBLES - 1)), bubble]);
    };

    target.addEventListener("pointermove", handleMove);
    return () => target.removeEventListener("pointermove", handleMove);
  }, [targetRef, reduceMotion]);

  if (reduceMotion) return null;

  const remove = (id: number) => setBubbles((current) => current.filter((bubble) => bubble.id !== id));

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.span
          key={bubble.id}
          className="absolute rounded-full border border-white/90 bg-linear-to-br from-white/80 to-lagoon/30 shadow-[inset_-2px_-3px_5px_rgba(255,255,255,0.9)]"
          style={{
            left: bubble.x - bubble.size / 2,
            top: bubble.y - bubble.size / 2,
            width: bubble.size,
            height: bubble.size,
          }}
          initial={{ opacity: 0.95, scale: 0.3, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 1, x: bubble.drift, y: -RISE_PX }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          onAnimationComplete={() => remove(bubble.id)}
        />
      ))}
    </div>
  );
}
