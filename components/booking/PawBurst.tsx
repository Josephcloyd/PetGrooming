"use client";

import { PawPrint } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/lib/animations";

const PARTICLE_COUNT = 16;
const colors = ["text-coral", "text-sunny", "text-mint", "text-sky"];

const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
  const angle = (Math.PI * 2 * index) / PARTICLE_COUNT;
  const distance = 90 + (index % 3) * 32;
  return {
    id: index,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    rotate: (index * 47) % 360,
    delay: index * 0.025,
    isPaw: index % 2 === 0,
    color: colors[index % colors.length],
  };
});

/** Celebratory paw and confetti burst behind the success icon. */
export function PawBurst() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className={`absolute ${particle.color}`}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: particle.x,
            y: particle.y,
            scale: [0, 1.2, 1],
            opacity: [1, 1, 0],
            rotate: particle.rotate,
          }}
          transition={{ duration: 1.3, delay: 0.2 + particle.delay, ease: easeOut }}
        >
          {particle.isPaw ? (
            <PawPrint className="h-6 w-6 fill-current" strokeWidth={0} />
          ) : (
            <span className="block h-3 w-3 rounded-full bg-current" />
          )}
        </motion.span>
      ))}
    </div>
  );
}
