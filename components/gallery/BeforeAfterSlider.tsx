"use client";

import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BeforeAfterPair } from "@/data/types";

interface BeforeAfterSliderProps {
  pair: BeforeAfterPair;
}

const MIN = 0;
const MAX = 100;
const STEP = 2;
const BIG_STEP = 10;

function clamp(value: number): number {
  return Math.min(MAX, Math.max(MIN, value));
}

export function BeforeAfterSlider({ pair }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateFromPointer = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    updateFromPointer(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromPointer(event.clientX);
  };

  const stopDragging = () => setIsDragging(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const delta = event.shiftKey ? BIG_STEP : STEP;
    const next: Record<string, number | undefined> = {
      ArrowLeft: position - delta,
      ArrowDown: position - delta,
      ArrowRight: position + delta,
      ArrowUp: position + delta,
      Home: MIN,
      End: MAX,
    };
    const value = next[event.key];
    if (value === undefined) return;
    event.preventDefault();
    setPosition(clamp(value));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden rounded-[2rem] shadow-lift touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onPointerLeave={stopDragging}
    >
      <Image src={pair.after.src} alt={pair.after.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={pair.before.src} alt={pair.before.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      {pair.isSample ? (
        <span className="pointer-events-none absolute bottom-4 right-4 whitespace-nowrap rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold text-navy-soft backdrop-blur-sm">
          Illustrative sample
        </span>
      ) : null}

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-coral px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
        After
      </span>

      <div
        role="slider"
        tabIndex={0}
        aria-label={`Compare ${pair.petName} before and after grooming`}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% before`}
        onKeyDown={handleKeyDown}
        className="absolute inset-y-0 w-1 -translate-x-1/2 bg-white focus-visible:outline-none"
        style={{ left: `${position}%` }}
      >
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lift ring-2 ring-coral/0 transition [div:focus-visible>&]:ring-coral">
          <ChevronLeft className="-mr-1 h-4 w-4" aria-hidden="true" />
          <ChevronRight className="-ml-1 h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
