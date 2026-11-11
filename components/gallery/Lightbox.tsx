"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { GalleryPhoto } from "@/data/types";
import { backdropVariants, springSoft } from "@/lib/animations";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface LightboxProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const controlClass =
  "grid h-11 w-11 place-items-center rounded-full bg-white/90 text-navy shadow-soft transition-colors hover:bg-white focus-ring";

export function Lightbox({ photo, onClose, onPrev, onNext }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isOpen = photo !== null;
  useFocusTrap(dialogRef, isOpen, onClose);
  useLockBodyScroll(isOpen);

  return (
    <AnimatePresence>
      {photo ? (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="absolute inset-0 bg-navy/85 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={photo.alt}
            className="relative z-10 w-full max-w-4xl"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") onPrev();
              if (event.key === "ArrowRight") onNext();
            }}
          >
            <motion.div
              layoutId={reduceMotion ? undefined : `photo-${photo.id}`}
              transition={springSoft}
              className="relative mx-auto max-h-[80vh] overflow-hidden rounded-3xl bg-navy shadow-lift"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 56rem, 100vw" className="object-cover" />
            </motion.div>
            <p className="mt-3 text-center text-sm text-white/80">{photo.alt}</p>

            <div className="absolute -top-14 right-0 flex gap-2 sm:top-1/2 sm:-right-14 sm:-translate-y-1/2 sm:flex-col">
              <button type="button" onClick={onClose} className={controlClass} aria-label="Close">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-3">
              <button type="button" onClick={onPrev} className={controlClass} aria-label="Previous photo">
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={onNext} className={controlClass} aria-label="Next photo">
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
