"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUp, viewportOnce } from "@/lib/animations";

type Tag = "div" | "section" | "article" | "li" | "header" | "footer";

interface AnimatedSectionProps {
  as?: Tag;
  children: ReactNode;
  className?: string;
  /** Seconds to wait before this block reveals. */
  delay?: number;
  /** Fraction of the element that must be visible before revealing. */
  amount?: number;
  id?: string;
  "aria-labelledby"?: string;
}

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  header: motion.header,
  footer: motion.footer,
};

/** Fades and slides children up the first time they scroll into view. */
export function AnimatedSection({
  as = "div",
  children,
  className,
  delay = 0,
  amount = viewportOnce.amount,
  id,
  ...rest
}: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion();
  const Component = tags[as];

  return (
    <Component
      id={id}
      className={className}
      variants={fadeUp}
      custom={delay}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount }}
      aria-labelledby={rest["aria-labelledby"]}
    >
      {children}
    </Component>
  );
}
