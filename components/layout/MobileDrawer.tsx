"use client";

import { useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { easeOut } from "@/lib/animations";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { Button } from "@/components/ui/Button";
import { FloatingShapes } from "@/components/decor/FloatingShapes";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/* The menu floods in as a circle growing out of the hamburger corner. */
const CLOSED = "circle(0% at 100% 0%)";
const OPEN = "circle(150% at 100% 0%)";

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  useFocusTrap(panelRef, isOpen, onClose);
  useLockBodyScroll(isOpen);

  const reveal = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { clipPath: CLOSED }, animate: { clipPath: OPEN }, exit: { clipPath: CLOSED } };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="drawer"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-navy text-white md:hidden"
          {...reveal}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <FloatingShapes className="opacity-40" />
          <div className="relative flex justify-end px-5 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-coral focus-ring"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="relative flex flex-1 flex-col justify-center gap-1 px-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={reduceMotion ? false : { opacity: 0, y: 30, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.2 + index * 0.06, type: "spring", stiffness: 380, damping: 22 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-2xl py-2 font-display text-4xl font-semibold text-white transition-colors hover:text-sunny focus-ring"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="relative space-y-3 px-8 pb-10">
            <Button href="/booking" onClick={onClose} size="lg" className="w-full">
              Book Now
            </Button>
            <a href={site.phoneHref} className="block rounded-md text-center text-sm text-white/70 focus-ring">
              Call {site.phone}
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
