"use client";

import { PawPrint } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  steps: readonly string[];
  current: number;
}

/** Progress track with a little paw that trots along to the current step. */
export function ProgressBar({ steps, current }: ProgressBarProps) {
  const reduceMotion = useReducedMotion();
  const percent = ((current + 1) / steps.length) * 100;
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.5, ease: easeOut };

  return (
    <div>
      <div className="relative">
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={current + 1}
          aria-valuetext={`Step ${current + 1} of ${steps.length}: ${steps[current]}`}
          className="h-2.5 overflow-hidden rounded-full bg-white"
        >
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-coral to-sunny"
            initial={false}
            animate={{ width: `${percent}%` }}
            transition={transition}
          />
        </div>
        <motion.span
          aria-hidden="true"
          className="absolute top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-coral text-navy shadow-soft"
          initial={false}
          animate={{ left: `${percent}%` }}
          transition={transition}
        >
          <PawPrint className="h-4 w-4 fill-current" strokeWidth={0} />
        </motion.span>
      </div>
      <ol className="mt-4 grid grid-cols-5 text-[11px] font-semibold uppercase tracking-wide sm:text-xs">
        {steps.map((label, index) => (
          <li
            key={label}
            aria-current={index === current ? "step" : undefined}
            className={cn(
              "truncate text-center",
              index < current && "text-coral-dark",
              index === current && "text-navy",
              index > current && "text-navy/35",
            )}
          >
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
}
