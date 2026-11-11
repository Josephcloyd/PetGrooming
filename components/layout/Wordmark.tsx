"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";

/** Oversized footer wordmark: letters rise in one by one and hop when hovered. */
export function Wordmark() {
  const reduceMotion = useReducedMotion();
  const letters = site.name.split("");

  return (
    <motion.p
      aria-hidden="true"
      className="flex select-none justify-center overflow-hidden whitespace-pre font-display text-[15vw] font-semibold leading-[0.85] text-white/10 lg:text-[11rem]"
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.04 }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{ hidden: { y: "100%" }, visible: { y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }}
          whileHover={reduceMotion ? undefined : { y: "-12%", color: "rgb(255 209 102 / 0.6)" }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.p>
  );
}
