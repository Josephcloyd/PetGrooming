import type { Transition, Variants } from "motion/react";

/** Shared easing + transitions. Keep motion fast and purposeful (0.3–0.6s). */
export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const springSoft: Transition = { type: "spring", stiffness: 260, damping: 24 };
export const springSnappy: Transition = { type: "spring", stiffness: 420, damping: 30 };

export const viewportOnce = { once: true, amount: 0.2 } as const;

/** Fade + slide up. Pass `custom={delaySeconds}` to offset. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut, delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.4, ease: easeOut, delay },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { ...springSoft, delay },
  }),
};

/** Parent variants that stagger their children. */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/** Word-by-word headline "splash": each word drops in with a bouncy tilt. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "-0.7em", rotate: -8 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 520, damping: 17 },
  },
};

/** Rubber-stamp entrance: lands slightly oversized and rotated, then settles. */
export const stampIn: Variants = {
  hidden: { opacity: 0, scale: 1.6, rotate: -18 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 380, damping: 16 },
  },
};

export const cardHover = { y: -8, scale: 1.02 };
export const tapScale = { scale: 0.95 };

/** Direction-aware horizontal slide (booking steps, carousel). */
export const slideHorizontal: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: easeOut } },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.25, ease: easeOut },
  }),
};

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
