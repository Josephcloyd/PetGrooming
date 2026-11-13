"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn, formatPrice } from "@/lib/utils";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const ROW_HEIGHT = "h-[1.1em]";

interface RollingPriceProps {
  value: number;
  className?: string;
}

/**
 * Odometer-style price: each digit is a vertical reel that rolls to its new value.
 * Screen readers get the plain formatted price.
 */
export function RollingPrice({ value, className }: RollingPriceProps) {
  const reduceMotion = useReducedMotion();
  const text = formatPrice(value);
  const chars = text.split("");

  return (
    <span className={cn("relative inline-flex", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex leading-[1.1] tabular-nums">
        {chars.map((char, index) => {
          /* Key from the right so "₱999" -> "₱1,299" keeps the units reel stable. */
          const position = chars.length - index;
          if (char === "₱") {
            return (
              <span key={`sym-${position}`} className="mr-[0.08em] inline-block self-start pt-[0.3em] text-[0.5em] font-medium opacity-80">
                {char}
              </span>
            );
          }
          if (!/\d/.test(char)) {
            return (
              <span key={`sym-${position}`} className={cn("inline-block", ROW_HEIGHT)}>
                {char}
              </span>
            );
          }
          return (
            <span key={`digit-${position}`} className={cn("relative inline-block overflow-hidden", ROW_HEIGHT)}>
              <motion.span
                className="flex flex-col"
                initial={false}
                animate={{ y: `${-Number(char) * 10}%` }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 210, damping: 22, delay: position * 0.05 }
                }
              >
                {DIGITS.map((digit) => (
                  <span key={digit} className={cn("block", ROW_HEIGHT)}>
                    {digit}
                  </span>
                ))}
              </motion.span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
