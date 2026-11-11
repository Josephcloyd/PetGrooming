"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Service } from "@/data/types";
import { cardHover, fadeUp, springSoft } from "@/lib/animations";
import { cn, formatDuration, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

const accentClasses: Record<Service["accent"], string> = {
  coral: "bg-coral-light text-coral-dark",
  sunny: "bg-sunny-light text-navy",
  mint: "bg-mint text-navy",
  sky: "bg-sky text-navy",
};

const BUBBLES = [
  { left: "12%", size: 10, delay: 0 },
  { left: "30%", size: 18, delay: 0.3 },
  { left: "52%", size: 8, delay: 0.55 },
  { left: "70%", size: 14, delay: 0.15 },
  { left: "86%", size: 11, delay: 0.42 },
];

/** Soap bubbles that rise through the card while it is hovered or focused. */
function RisingBubbles({ distance }: { distance: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {BUBBLES.map((bubble) => (
        <motion.span
          key={bubble.left}
          className="absolute -bottom-5 rounded-full border border-lagoon/60 bg-lagoon-light/60"
          style={{ left: bubble.left, width: bubble.size, height: bubble.size }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -distance, opacity: [0, 0.9, 0], x: [0, 6, -6, 0] }}
          transition={{ duration: 1.8, delay: bubble.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const reduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(false);
  const Icon = service.icon;
  const isFeatured = Boolean(service.featured);

  return (
    <motion.li
      variants={fadeUp}
      whileHover={reduceMotion ? undefined : cardHover}
      transition={springSoft}
      onHoverStart={() => setIsActive(true)}
      onHoverEnd={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-6 shadow-soft transition-shadow hover:shadow-lift",
        isFeatured ? "bg-navy text-white sm:col-span-2 lg:row-span-2 lg:p-10" : "bg-white text-navy",
      )}
    >
      {isActive && !reduceMotion ? <RisingBubbles distance={isFeatured ? 460 : 300} /> : null}

      <div className="relative flex items-start justify-between gap-3">
        <motion.span
          className={cn(
            "grid place-items-center rounded-2xl",
            isFeatured ? "h-16 w-16 bg-coral text-white" : cn("h-12 w-12", accentClasses[service.accent]),
          )}
          animate={isActive && !reduceMotion ? { rotate: [0, -14, 10, -6, 0] } : { rotate: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className={isFeatured ? "h-8 w-8" : "h-6 w-6"} aria-hidden="true" />
        </motion.span>
        {isFeatured ? <Badge tone="sunny">Signature</Badge> : null}
      </div>

      <h3 className={cn("relative mt-5 font-semibold", isFeatured ? "text-4xl lg:text-5xl" : "text-xl")}>
        {service.name}
      </h3>
      <p className={cn("relative mt-2", isFeatured ? "max-w-md text-lg text-white/75" : "flex-1 text-sm text-navy-soft")}>
        {service.description}
      </p>
      {isFeatured ? (
        <div className="relative mt-6 flex-1">
          {service.image ? (
            <div className="relative hidden h-full min-h-48 overflow-hidden rounded-3xl lg:block">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 40vw, 0px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn(
          "relative mt-5 flex items-center justify-between border-t pt-4 text-sm",
          isFeatured ? "border-white/15" : "border-navy/5",
        )}
      >
        <span className="font-semibold">
          From <span className={isFeatured ? "text-sunny" : "text-coral-dark"}>{formatPrice(service.startingPrice)}</span>
        </span>
        <span className={cn("inline-flex items-center gap-1", isFeatured ? "text-white/70" : "text-navy-soft")}>
          <Clock className="h-4 w-4" aria-hidden="true" />
          {formatDuration(service.durationMinutes)}
        </span>
      </div>
      <Link
        href={`/booking?service=${service.id}`}
        className={cn(
          "relative mt-4 inline-flex items-center gap-1 rounded-md text-sm font-semibold focus-ring",
          isFeatured ? "text-sunny" : "text-coral-dark",
        )}
      >
        Book this
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </motion.li>
  );
}
