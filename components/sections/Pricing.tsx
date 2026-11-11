"use client";

import { useState } from "react";
import { Dog } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { packages, sizeOptions } from "@/data/pricing";
import type { PetSize } from "@/data/types";
import { springSnappy, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingCard } from "@/components/cards/PricingCard";

const PET_SCALE: Record<PetSize, number> = { small: 0.65, medium: 1, large: 1.4 };

/** A pup that grows and shrinks with the chosen size. */
function SizedPup({ size }: { size: PetSize }) {
  const reduceMotion = useReducedMotion();
  return (
    <span aria-hidden="true" className="grid h-20 w-20 place-items-center rounded-full bg-sunny shadow-soft">
      <motion.span
        animate={{ scale: PET_SCALE[size], rotate: reduceMotion ? 0 : [0, -10, 8, 0] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { scale: { type: "spring", stiffness: 380, damping: 11 }, rotate: { duration: 0.5 } }
        }
        key={size}
      >
        <Dog className="h-9 w-9 text-navy" />
      </motion.span>
    </span>
  );
}

export function Pricing() {
  const reduceMotion = useReducedMotion();
  const [size, setSize] = useState<PetSize>("medium");

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <AnimatedSection>
          <SectionHeading
            id="pricing-heading"
            eyebrow="Packages"
            title="Simple pricing, no surprises at pickup"
            highlight="no surprises"
            description="Choose your pet's size and watch the prices roll. Every package includes a coat check and a report card."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <SizedPup size={size} />
          <div role="radiogroup" aria-label="Pet size" className="relative inline-flex rounded-full bg-white p-1.5 shadow-soft">
            {sizeOptions.map((option) => {
              const isActive = option.value === size;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setSize(option.value)}
                  className={cn(
                    "relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-ring sm:px-7",
                    isActive ? "text-white" : "text-navy-soft hover:text-navy",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="size-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-coral"
                      transition={reduceMotion ? { duration: 0 } : springSnappy}
                    />
                  ) : null}
                  <span className="block">{option.label}</span>
                  <span className={cn("block text-[11px] font-normal", isActive ? "text-white/80" : "text-navy-soft/70")}>
                    {option.hint}
                  </span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        <motion.ul
          variants={staggerContainer(0.1)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch"
        >
          {packages.map((pkg) => (
            <PricingCard key={pkg.id} pkg={pkg} size={size} />
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
