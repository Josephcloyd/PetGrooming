"use client";

import { useRef } from "react";
import { PawPrint } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { processSteps } from "@/data/steps";
import { fadeUp, staggerContainer, stampIn, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const DESKTOP_PAWS = 16;
const MOBILE_PAWS = 12;

interface TrailPawProps {
  progress: MotionValue<number>;
  index: number;
  total: number;
  vertical: boolean;
  isStatic: boolean;
}

/** One footprint that stamps down once scroll progress reaches its spot on the trail. */
function TrailPaw({ progress, index, total, vertical, isStatic }: TrailPawProps) {
  const start = index / total;
  const end = start + 0.7 / total;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [1.8, 1]);
  const isLeftFoot = index % 2 === 0;
  const offset = isLeftFoot ? -7 : 7;
  const heading = vertical ? 180 : 90;

  return (
    <motion.span
      className="block text-coral"
      style={{
        opacity: isStatic ? 1 : opacity,
        scale: isStatic ? 1 : scale,
        rotate: heading + (isLeftFoot ? -12 : 12),
        x: vertical ? offset : 0,
        y: vertical ? 0 : offset,
      }}
    >
      <PawPrint className="h-4 w-4 fill-current" strokeWidth={0} />
    </motion.span>
  );
}

interface TrailProps {
  progress: MotionValue<number>;
  count: number;
  vertical: boolean;
  isStatic: boolean;
  className: string;
}

function Trail({ progress, count, vertical, isStatic, className }: TrailProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute flex justify-between", className)}>
      {Array.from({ length: count }, (_, index) => (
        <TrailPaw key={index} progress={progress} index={index} total={count} vertical={vertical} isStatic={isStatic} />
      ))}
    </div>
  );
}

export function HowItWorks() {
  const reduceMotion = Boolean(useReducedMotion());
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.8", "end 0.45"] });

  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container>
        <AnimatedSection>
          <SectionHeading
            id="how-heading"
            eyebrow="How it works"
            title="Four easy steps to a happier, fluffier friend"
            highlight="fluffier"
            description="Scroll along and follow the paw prints."
          />
        </AnimatedSection>

        <motion.ol
          ref={trackRef}
          variants={staggerContainer(0.14)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-16 grid gap-12 md:grid-cols-4 md:gap-6"
        >
          <Trail
            progress={scrollYProgress}
            count={DESKTOP_PAWS}
            vertical={false}
            isStatic={reduceMotion}
            className="left-[15%] right-[15%] top-8 hidden -translate-y-1/2 items-center md:flex"
          />
          <Trail
            progress={scrollYProgress}
            count={MOBILE_PAWS}
            vertical
            isStatic={reduceMotion}
            className="bottom-6 left-10 top-20 -translate-x-1/2 flex-col items-center md:hidden"
          />

          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.id}
                variants={fadeUp}
                className="relative flex gap-5 md:flex-col md:items-center md:text-center"
              >
                <motion.span
                  variants={stampIn}
                  className="relative z-10 grid h-20 w-20 shrink-0 place-items-center rounded-full bg-cream ring-8 ring-white"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-coral text-white shadow-soft">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-sunny font-display text-sm font-bold text-navy">
                    {index + 1}
                  </span>
                </motion.span>
                <div className="pt-3 md:pt-0">
                  <h3 className="text-xl font-semibold text-navy">{step.title}</h3>
                  <p className="mt-1 text-sm text-navy-soft">{step.description}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </Container>
    </section>
  );
}
