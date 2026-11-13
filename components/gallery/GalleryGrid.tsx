"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { GalleryPhoto, PetType } from "@/data/types";
import { springSnappy, springSoft } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

type Filter = "all" | PetType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "dog", label: "Dogs" },
  { value: "cat", label: "Cats" },
];

interface GalleryGridProps {
  photos: GalleryPhoto[];
}

/** Filterable photo grid. Photos slide to their new spots when the filter changes. */
export function GalleryGrid({ photos }: GalleryGridProps) {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visible = filter === "all" ? photos : photos.filter((photo) => photo.pet === filter);
  const activePhoto = activeIndex === null ? null : (visible[activeIndex] ?? null);

  const chooseFilter = (next: Filter) => {
    setActiveIndex(null);
    setFilter(next);
  };

  const step = (delta: number) => {
    setActiveIndex((current) => (current === null ? null : (current + delta + visible.length) % visible.length));
  };

  return (
    <>
      <div role="group" aria-label="Filter photos" className="mb-8 flex">
        <div className="inline-flex rounded-full bg-cream p-1.5 shadow-soft">
          {FILTERS.map((option) => {
            const isActive = option.value === filter;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => chooseFilter(option.value)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-ring",
                  isActive ? "text-navy" : "text-navy-soft hover:text-navy",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="gallery-filter-pill"
                    className="absolute inset-0 rounded-full bg-coral"
                    transition={reduceMotion ? { duration: 0 } : springSnappy}
                  />
                ) : null}
                <span className="relative">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.ul
        layout={!reduceMotion}
        className="relative grid grid-flow-row-dense auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 md:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((photo, index) => (
            <motion.li
              key={photo.id}
              layout={!reduceMotion}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={springSoft}
              className={cn(photo.height > photo.width && "row-span-2")}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative block h-full w-full overflow-hidden rounded-3xl shadow-soft focus-ring"
                aria-label={`Open photo: ${photo.alt}`}
              >
                <motion.div
                  layoutId={reduceMotion ? undefined : `photo-${photo.id}`}
                  transition={springSoft}
                  className="relative h-full w-full"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
                <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
                  {photo.caption}
                </span>
                <span className="pointer-events-none absolute right-3 top-3 grid h-9 w-9 scale-75 place-items-center rounded-full bg-white text-navy opacity-0 shadow-soft transition group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Lightbox
        photo={activePhoto}
        onClose={() => setActiveIndex(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </>
  );
}
