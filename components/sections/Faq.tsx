"use client";

import { useId, useState } from "react";
import { PhoneCall, Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { faqs } from "@/data/faqs";
import { site } from "@/data/site";
import type { Faq as FaqItem } from "@/data/types";
import { easeOut, springSnappy } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface FaqRowProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqRow({ item, isOpen, onToggle }: FaqRowProps) {
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  return (
    <li
      className={cn(
        "rounded-3xl border-2 transition-colors",
        isOpen ? "border-coral bg-white shadow-soft" : "border-transparent bg-white/70 hover:border-coral/50",
      )}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 rounded-3xl px-6 py-5 text-left font-display text-lg font-semibold text-navy focus-ring"
        >
          {item.question}
          <motion.span
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={reduceMotion ? { duration: 0 } : springSnappy}
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors",
              isOpen ? "bg-coral text-navy" : "bg-coral-light text-coral-dark",
            )}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="panel"
            initial={reduceMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { height: "auto", opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-navy-soft">{item.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <AnimatedSection className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="faq-heading"
            align="left"
            eyebrow="FAQ"
            title="Questions? We have answers"
          />
          <div className="mt-8 rounded-3xl bg-lagoon-light p-6">
            <p className="font-display text-xl font-semibold text-navy">Still wondering about something?</p>
            <p className="mt-1 text-sm text-navy-soft">We&apos;re happy to talk through your pet&apos;s needs.</p>
            <a
              href={site.phoneHref}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-soft hover:text-coral-dark focus-ring"
            >
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              Call the studio
            </a>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <ul className="space-y-3">
            {faqs.map((item) => (
              <FaqRow
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
              />
            ))}
          </ul>
        </AnimatedSection>
      </Container>
    </section>
  );
}
