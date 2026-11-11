"use client";

import { motion } from "motion/react";
import { springSnappy } from "@/lib/animations";

interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const bar = "absolute left-1/2 block h-0.5 w-6 -translate-x-1/2 rounded-full bg-navy";

/** Three bars that morph into an X. */
export function HamburgerButton({ isOpen, onToggle }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="relative grid h-11 w-11 place-items-center rounded-full text-navy hover:bg-coral-light/60 focus-ring md:hidden"
    >
      <span className="relative block h-5 w-6" aria-hidden="true">
        <motion.span
          className={bar}
          style={{ top: 2 }}
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
          transition={springSnappy}
        />
        <motion.span
          className={bar}
          style={{ top: 9 }}
          animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className={bar}
          style={{ top: 16 }}
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
          transition={springSnappy}
        />
      </span>
    </button>
  );
}
