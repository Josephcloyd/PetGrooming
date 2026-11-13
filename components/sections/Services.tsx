"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { services } from "@/data/services";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ServiceDetail } from "@/components/cards/ServiceDetail";

/* Featured service first so it anchors the top-left of the bento grid. */
const orderedServices = [...services].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

export function Services() {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const openService = services.find((service) => service.id === openId) ?? null;

  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 pt-16 pb-20 lg:pt-24 lg:pb-28">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <AnimatedSection>
            <SectionHeading
              id="services-heading"
              align="left"
              eyebrow="Services"
              title="From a quick tidy to the full spa day"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="max-w-sm">
            <p className="text-navy-soft">
              Tap any service to see what&apos;s included and the price for your pet&apos;s size.
            </p>
          </AnimatedSection>
        </div>

        <motion.ul
          variants={staggerContainer(0.07)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {orderedServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isOpen={openId === service.id}
              onOpen={() => setOpenId(service.id)}
            />
          ))}
          <motion.li variants={fadeUp}>
            <Link
              href="/booking"
              className="group flex h-full min-h-48 flex-col justify-between rounded-[2rem] border-2 border-dashed border-coral-dark/40 p-6 text-coral-dark transition-colors hover:border-coral-dark hover:bg-coral-light/40 focus-ring"
            >
              <span className="font-display text-2xl font-semibold leading-tight">Mix and match your own visit</span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold">
                Start booking
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </motion.li>
        </motion.ul>
      </Container>

      <ServiceDetail service={openService} onClose={() => setOpenId(null)} />
    </section>
  );
}
