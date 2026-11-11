"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { GalleryPhoto } from "@/data/types";
import { fadeUp, springSoft, staggerContainer, viewportOnce } from "@/lib/animations";
import { Lightbox } from "./Lightbox";
import { TiltFrame } from "./TiltFrame";

interface MasonryGridProps {
  photos: GalleryPhoto[];
}

export function MasonryGrid({ photos }: MasonryGridProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  const step = (delta: number) => {
    setActiveIndex((current) => (current === null ? null : (current + delta + photos.length) % photos.length));
  };

  return (
    <>
      <motion.ul
        variants={staggerContainer(0.06)}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={viewportOnce}
        className="columns-2 gap-4 md:columns-3 [&>li]:mb-4 [&>li]:break-inside-avoid"
      >
        {photos.map((photo, index) => (
          <motion.li key={photo.id} variants={fadeUp}>
            <TiltFrame className="rounded-3xl">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative block w-full overflow-hidden rounded-3xl shadow-soft focus-ring"
                aria-label={`Open photo: ${photo.alt}`}
              >
                <motion.div
                  layoutId={reduceMotion ? undefined : `photo-${photo.id}`}
                  transition={springSoft}
                  className="relative w-full"
                  style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
                <span className="pointer-events-none absolute bottom-3 right-3 grid h-10 w-10 scale-75 place-items-center rounded-full bg-white text-navy opacity-0 shadow-soft transition group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </TiltFrame>
          </motion.li>
        ))}
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
