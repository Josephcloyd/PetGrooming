"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Clock, HandHeart, House, Leaf, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/data/site";
import { fadeUp, scaleIn, staggerContainer, wordReveal } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Squiggle } from "@/components/ui/Squiggle";
import { BubbleCursor } from "@/components/decor/BubbleCursor";
import { FloatingShapes } from "@/components/decor/FloatingShapes";
import { FoamReveal } from "@/components/decor/FoamReveal";
import { SpinningBadge } from "@/components/decor/SpinningBadge";

const promises = [
  { icon: HandHeart, label: "Gentle, low-stress handling" },
  { icon: Leaf, label: "Natural, pet-safe products" },
  { icon: House, label: "Studio or home visits" },
];

/* Organic shapes the photo frame slowly morphs between. */
const BLOB_SHAPES = [
  "58% 42% 46% 54% / 52% 44% 56% 48%",
  "42% 58% 60% 40% / 46% 56% 44% 54%",
  "52% 48% 38% 62% / 60% 40% 60% 40%",
];

function AnimatedWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <motion.span variants={wordReveal} className="inline-block origin-bottom">
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 80]);
  const shapesY = useTransform(scrollY, [0, 700], [0, -90]);
  const initial = reduceMotion ? false : "hidden";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-32 pb-24 sm:pt-36 lg:pt-44 lg:pb-32"
    >
      <motion.div style={{ y: reduceMotion ? 0 : shapesY }} className="absolute inset-0">
        <FloatingShapes />
      </motion.div>
      <BubbleCursor targetRef={sectionRef} />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <motion.div variants={staggerContainer(0.06)} initial={initial} animate="visible">
          <motion.p
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-coral-dark shadow-soft"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Spa-day grooming in {site.address.city}
          </motion.p>

          <h1
            id="hero-heading"
            className="text-[3.4rem] font-semibold leading-[0.98] text-navy sm:text-7xl lg:text-[5.5rem]"
          >
            <span className="block">
              <AnimatedWords text={site.headline.lead} />
            </span>{" "}
            <span className="relative mt-1 inline-block text-coral">
              <AnimatedWords text={site.headline.highlight} />
              <Squiggle className="text-sunny" delay={0.9} />
            </span>
          </h1>

          <motion.p variants={fadeUp} className="mt-8 max-w-lg text-lg text-navy-soft sm:text-xl">
            {site.subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/booking" size="lg">
              Book a Grooming
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button href="/#services" variant="secondary" size="lg">
              View Services
            </Button>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-9 flex flex-wrap gap-2">
            {promises.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-medium text-navy shadow-soft"
              >
                <Icon className="h-4 w-4 text-coral" aria-hidden="true" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={scaleIn}
          custom={0.25}
          initial={initial}
          animate="visible"
          style={{ y: reduceMotion ? 0 : imageY }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-5 -z-10 rotate-6 rounded-[44%_56%_52%_48%/50%_42%_58%_50%] bg-lagoon/35"
          />
          <motion.div
            className="relative aspect-[4/3] overflow-hidden shadow-lift sm:aspect-[4/5]"
            style={{ borderRadius: BLOB_SHAPES[0] }}
            animate={reduceMotion ? undefined : { borderRadius: [...BLOB_SHAPES, BLOB_SHAPES[0]] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={site.heroImage.src}
              alt={site.heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 28rem, 100vw"
              className="object-cover"
            />
            <FoamReveal />
          </motion.div>

          <SpinningBadge className="absolute -left-3 -top-6 sm:-left-8" />

          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 right-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift sm:right-6"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint text-navy">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-bold text-navy">Open Mon – Sat</span>
              <span className="block text-xs text-navy-soft">Book online any time</span>
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
