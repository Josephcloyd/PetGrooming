"use client";

import { useRef } from "react";
import { ArrowRight, Check, Clock, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { sizeOptions } from "@/data/pricing";
import type { Service } from "@/data/types";
import { backdropVariants, fadeUp, springSoft, staggerContainer } from "@/lib/animations";
import { servicePrice } from "@/lib/pricing";
import { cn, formatDuration, formatPrice } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { Button } from "@/components/ui/Button";
import { accentClasses, serviceSurfaceId } from "./ServiceCard";

interface ServiceDetailProps {
  service: Service | null;
  onClose: () => void;
}

/** Detail panel the service card expands into: what's included, price by size, and a booking button. */
export function ServiceDetail({ service, onClose }: ServiceDetailProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isOpen = service !== null;
  useFocusTrap(dialogRef, isOpen, onClose);
  useLockBodyScroll(isOpen);

  return (
    <AnimatePresence>
      {service ? (
        <motion.div
          key="service-detail"
          className="fixed inset-0 z-[70] flex items-end justify-center p-3 sm:items-center sm:p-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-detail-title"
            className="relative w-full max-w-lg"
          >
            <motion.div
              layoutId={reduceMotion ? undefined : serviceSurfaceId(service.id)}
              transition={springSoft}
              className="absolute inset-0 rounded-[2rem] bg-white shadow-lift"
            />
            <motion.div
              className="relative max-h-[85vh] overflow-y-auto p-7 sm:p-9"
              variants={staggerContainer(0.05, 0.12)}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
            >
              <div className="flex items-start justify-between gap-4">
                <motion.span
                  variants={fadeUp}
                  className={cn("grid h-14 w-14 place-items-center rounded-2xl", accentClasses[service.accent])}
                >
                  <service.icon className="h-7 w-7" aria-hidden="true" />
                </motion.span>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full bg-cream text-navy hover:bg-coral-light focus-ring"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <motion.h3 variants={fadeUp} id="service-detail-title" className="mt-5 text-3xl font-semibold text-navy">
                {service.name}
              </motion.h3>
              <motion.p variants={fadeUp} className="mt-2 text-navy-soft">
                {service.description}
              </motion.p>
              <motion.p variants={fadeUp} className="mt-3 inline-flex items-center gap-1.5 text-sm text-navy-soft">
                <Clock className="h-4 w-4" aria-hidden="true" />
                About {formatDuration(service.durationMinutes)}
              </motion.p>

              <motion.div variants={fadeUp}>
                <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-navy">What&apos;s included</h4>
                <ul className="mt-3 space-y-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-navy">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-coral-light text-coral-dark">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-navy">Price by size</h4>
                <dl className="mt-3 grid grid-cols-3 gap-2">
                  {sizeOptions.map((option) => (
                    <div key={option.value} className="rounded-2xl bg-cream px-3 py-3 text-center">
                      <dt className="text-xs font-semibold text-navy-soft">{option.label}</dt>
                      <dd className="font-display text-xl font-semibold text-navy">
                        {formatPrice(servicePrice(service, option.value))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-7">
                <Button href={`/booking?service=${service.id}`} className="w-full">
                  Book this service
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
