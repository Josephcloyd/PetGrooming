"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/** Honours the OS "reduce motion" setting for every Motion component. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
