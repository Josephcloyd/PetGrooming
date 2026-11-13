"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { BookingFormValues } from "@/lib/booking/schema";
import { formatLongDate } from "@/lib/booking/schedule";
import type { BookingQuote } from "@/lib/pricing";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/animations";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PawBurst } from "./PawBurst";
import { PetBuddy } from "./PetBuddy";

const BATH_BUBBLES = [
  { left: "18%", size: 12, delay: 0.3 },
  { left: "38%", size: 18, delay: 0.6 },
  { left: "60%", size: 10, delay: 0.45 },
  { left: "78%", size: 15, delay: 0.8 },
];
const BUBBLE_ROUNDS = 3;

interface SuccessScreenProps {
  bookingId: string;
  values: BookingFormValues;
  quote: BookingQuote;
  onBookAnother: () => void;
}

/** The booked pet gets a celebratory little bath. */
function BathTime({ values }: { values: BookingFormValues }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto mb-6 h-28 w-28">
      <PawBurst />
      <motion.div variants={scaleIn} className="relative h-28 w-28 overflow-hidden rounded-full bg-lagoon-light">
        <PetBuddy
          petType={values.petType}
          size="large"
          className="absolute inset-x-0 top-3 mx-auto h-20 w-20 bg-transparent"
          iconClassName="h-12 w-12"
        />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-9 rounded-b-full bg-lagoon/60" />
        {!reduceMotion
          ? BATH_BUBBLES.map((bubble) => (
              <motion.span
                key={bubble.left}
                aria-hidden="true"
                className="absolute bottom-3 rounded-full border border-white bg-white/70"
                style={{ left: bubble.left, width: bubble.size, height: bubble.size }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -80, opacity: [0, 1, 0] }}
                transition={{ duration: 1.6, delay: bubble.delay, repeat: BUBBLE_ROUNDS - 1, ease: "easeOut" }}
              />
            ))
          : null}
      </motion.div>
      <motion.span
        variants={scaleIn}
        custom={0.5}
        className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full bg-coral text-navy shadow-soft ring-4 ring-white"
      >
        <Check className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
      </motion.span>
    </div>
  );
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
      <BathTime values={values} />

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
