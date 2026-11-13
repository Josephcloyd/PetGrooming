"use client";

import { ViewTransition } from "react";
import Image from "next/image";
import { ArrowRight, Clock, HandHeart, House, Leaf, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/data/site";
import { fadeUp, scaleIn, staggerContainer, wordReveal } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Squiggle } from "@/components/ui/Squiggle";
import { FloatingShapes } from "@/components/decor/FloatingShapes";
import { FoamReveal } from "@/components/decor/FoamReveal";
import { SpinningBadge } from "@/components/decor/SpinningBadge";
import { BOOKING_CARD_TRANSITION } from "@/lib/transitions";

const promises = [
  { icon: HandHeart, label: "Gentle, low-stress handling" },
  { icon: Leaf, label: "Natural, pet-safe products" },
  { icon: House, label: "Studio or home visits" },
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
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 70]);
  const shapesY = useTransform(scrollY, [0, 700], [0, -80]);
  const initial = reduceMotion ? false : "hidden";

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pt-44 lg:pb-32">
      <motion.div style={{ y: reduceMotion ? 0 : shapesY }} className="absolute inset-0">
        <FloatingShapes />
      </motion.div>

      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        {/* min-w-0 stops the swipeable promise row from stretching this column past the screen. */}
        <motion.div variants={staggerContainer(0.06)} initial={initial} animate="visible" className="min-w-0">
          <motion.p
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-coral-dark shadow-soft"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Spa-day grooming in {site.address.city}
          </motion.p>

          <h1
            id="hero-heading"
            className="text-[3.2rem] font-semibold leading-[0.98] text-navy sm:text-7xl lg:text-[5.5rem]"
          >
            <span className="block">
              <AnimatedWords text={site.headline.lead} />
            </span>{" "}
            <span className="relative mt-1 inline-block text-coral-dark">
              <AnimatedWords text={site.headline.highlight} />
              <Squiggle className="text-sunny" delay={0.9} />
            </span>
          </h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-lg text-lg text-navy-soft sm:text-xl">
            {site.subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ViewTransition name={BOOKING_CARD_TRANSITION} share="morph" default="none">
              <Button href="/booking" size="lg">
                Book a Grooming
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </ViewTransition>
            <Button href="/#services" variant="secondary" size="lg">
              View Services
            </Button>
          </motion.div>

          {/* One swipeable row on phones so the promises don't push content down. */}
          <motion.ul
            variants={fadeUp}
            className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            {promises.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-medium text-navy shadow-soft"
              >
                <Icon className="h-4 w-4 text-coral-dark" aria-hidden="true" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* On phones the photo leads, so the first screen isn't all text. */}
        <motion.div
          variants={scaleIn}
          custom={0.25}
          initial={initial}
          animate="visible"
          style={{ y: reduceMotion ? 0 : imageY }}
          className="relative order-first mx-auto w-full max-w-sm sm:max-w-md lg:order-none lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rotate-6 rounded-[44%_56%_52%_48%/50%_42%_58%_50%] bg-lagoon/35 sm:-inset-5"
          />
          <div className="relative aspect-[5/4] overflow-hidden rounded-[58%_42%_46%_54%/52%_44%_56%_48%] shadow-lift sm:aspect-[4/5]">
            <Image
              src={site.heroImage.src}
              alt={site.heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 28rem, 24rem"
              className="object-cover"
            />
            <FoamReveal />
          </div>

          <SpinningBadge className="absolute -left-2 -top-4 h-24 w-24 sm:-left-8 sm:-top-6 sm:h-32 sm:w-32" />

          <div className="absolute -bottom-5 right-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift sm:right-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-lagoon-light text-navy">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-bold text-navy">Open Mon – Sat</span>
              <span className="block text-xs text-navy-soft">Book online any time</span>
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
