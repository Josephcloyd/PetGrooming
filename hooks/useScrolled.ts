"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > threshold);
  });

  return scrolled;
}
