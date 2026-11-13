"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

/** Stylised map placeholder: the pin drops in and sends out ripples. */
export function MapCard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative flex min-h-[24rem] flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-lagoon/50 p-8 text-center shadow-soft"
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div aria-hidden="true" className="absolute inset-0 map-grid" />
      <div aria-hidden="true" className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-sunny-light/80" />
      <div aria-hidden="true" className="absolute -bottom-12 right-6 h-48 w-48 rounded-full bg-lagoon-light/80" />

      <div className="relative mb-6 h-20 w-20">
        <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-3 rounded-full bg-navy/20 blur-[2px]" />
        {!reduceMotion ? (
          <>
            <span aria-hidden="true" className="absolute inset-x-2 bottom-[-6px] h-6 animate-ping rounded-full border-2 border-coral/60" />
            <span
              aria-hidden="true"
              className="absolute inset-x-5 bottom-[-2px] h-3 animate-ping rounded-full border-2 border-coral/60 [animation-delay:400ms]"
            />
          </>
        ) : null}
        <motion.span
          className="absolute inset-x-0 bottom-2 mx-auto grid h-16 w-16 place-items-center rounded-full bg-coral text-navy shadow-lift"
          variants={{
            hidden: { y: -120, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 420, damping: 12, mass: 0.9, delay: 0.2 },
            },
          }}
        >
          <MapPin className="h-8 w-8" aria-hidden="true" />
        </motion.span>
      </div>

      <p className="relative font-display text-2xl font-semibold text-navy">{site.name}</p>
      <p className="relative mt-1 max-w-xs text-sm text-navy">
        {[site.address.street, site.address.city, site.address.countryName].filter(Boolean).join(", ")}
      </p>
      <div className="relative mt-5">
        <Button href={site.mapsUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
          Open in Google Maps
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </motion.div>
  );
}
