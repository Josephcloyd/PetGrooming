"use client";

import { CircleCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { BookingFormValues } from "@/lib/booking/schema";
import { formatLongDate } from "@/lib/booking/schedule";
import type { BookingQuote } from "@/lib/pricing";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/animations";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PawBurst } from "./PawBurst";

interface SuccessScreenProps {
  bookingId: string;
  values: BookingFormValues;
  quote: BookingQuote;
  onBookAnother: () => void;
}

export function SuccessScreen({ bookingId, values, quote, onBookAnother }: SuccessScreenProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={staggerContainer(0.1, 0.15)}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      className="relative overflow-hidden rounded-3xl bg-white p-8 text-center shadow-lift sm:p-12"
      role="status"
      aria-live="polite"
    >
      <div className="relative mx-auto mb-6 h-24 w-24">
        <PawBurst />
        <motion.span
          variants={scaleIn}
          className="relative grid h-24 w-24 place-items-center rounded-full bg-mint text-navy"
        >
          <CircleCheck className="h-12 w-12" aria-hidden="true" />
        </motion.span>
      </div>

      <motion.h2 variants={fadeUp} className="text-3xl font-semibold text-navy sm:text-4xl">
        {values.petName} is booked in!
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-3 text-navy-soft">
        We&apos;ll see you on <span className="font-semibold text-navy">{formatLongDate(values.date)}</span> at{" "}
        <span className="font-semibold text-navy">{values.timeSlot}</span>. A confirmation is on its way to {values.email}.
      </motion.p>

      <motion.dl variants={fadeUp} className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-4 rounded-2xl bg-cream p-5 text-left">
        <div>
          <dt className="text-xs uppercase tracking-wide text-navy-soft">Reference</dt>
          <dd className="font-mono text-sm font-semibold text-navy">{bookingId}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-navy-soft">Estimated total</dt>
          <dd className="font-display text-xl font-semibold text-navy">{formatPrice(quote.total)}</dd>
        </div>
      </motion.dl>

      <motion.div variants={fadeUp} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href="/">Back to home</Button>
        <Button variant="secondary" onClick={onBookAnother}>
          Book another pet
        </Button>
      </motion.div>
    </motion.div>
  );
}
