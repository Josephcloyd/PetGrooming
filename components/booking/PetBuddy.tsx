"use client";

import { Cat, Dog } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { PetSize, PetType } from "@/data/types";
import { cn } from "@/lib/utils";

const SIZE_SCALE: Record<PetSize, number> = { small: 0.7, medium: 0.9, large: 1.1 };

interface PetBuddyProps {
  petType: PetType;
  size: PetSize;
  className?: string;
  iconClassName?: string;
}

/** A little dog or cat that swaps in when the pet type changes and grows with the chosen size. */
export function PetBuddy({ petType, size, className, iconClassName = "h-8 w-8" }: PetBuddyProps) {
  const reduceMotion = useReducedMotion();
  const Icon = petType === "cat" ? Cat : Dog;

  return (
    <span
      aria-hidden="true"
      className={cn("relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-sunny text-navy", className)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={petType}
          className="grid place-items-center"
          initial={reduceMotion ? false : { y: 28, rotate: -20, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1, scale: SIZE_SCALE[size] }}
          exit={reduceMotion ? { opacity: 0 } : { y: -28, rotate: 20, opacity: 0 }}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 15 }}
        >
          <Icon className={iconClassName} />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
