"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Service } from "@/data/types";
import { cardHover, fadeUp, springSoft } from "@/lib/animations";
import { cn, formatDuration, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export const accentClasses: Record<Service["accent"], string> = {
  coral: "bg-coral-light text-coral-dark",
  sunny: "bg-sunny-light text-navy",
  lagoon: "bg-lagoon-light text-navy",
};

/** Shared by the card surface and the detail panel so one morphs into the other. */
export const serviceSurfaceId = (id: string): string => `service-surface-${id}`;

interface ServiceCardProps {
  service: Service;
  onOpen: () => void;
  isOpen: boolean;
}

/** The whole card is one button that expands into the service detail panel. */
export function ServiceCard({ service, onOpen, isOpen }: ServiceCardProps) {
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
      className={cn("relative h-full", isFeatured && "sm:col-span-2 lg:row-span-2")}
    >
      <motion.div
        layoutId={reduceMotion ? undefined : serviceSurfaceId(service.id)}
        transition={springSoft}
        className={cn(
          "absolute inset-0 rounded-[2rem] shadow-soft transition-shadow",
          isActive && "shadow-lift",
          isFeatured ? "bg-navy" : "bg-white",
          isOpen && "opacity-0",
        )}
      />
      <button
        type="button"
        onClick={onOpen}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        aria-haspopup="dialog"
        className={cn(
          "group relative flex h-full w-full flex-col rounded-[2rem] p-6 text-left focus-ring",
          isFeatured ? "text-white lg:p-10" : "text-navy",
        )}
      >
        <span className="flex w-full items-start justify-between gap-3">
          <motion.span
            className={cn(
              "grid place-items-center rounded-2xl",
              isFeatured ? "h-16 w-16 bg-coral text-navy" : cn("h-12 w-12", accentClasses[service.accent]),
            )}
            animate={isActive && !reduceMotion ? { rotate: [0, -14, 10, -6, 0] } : { rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className={isFeatured ? "h-8 w-8" : "h-6 w-6"} aria-hidden="true" />
          </motion.span>
          {isFeatured ? (
            <Badge tone="sunny">Signature</Badge>
          ) : (
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-full bg-cream text-navy transition-transform group-hover:rotate-90"
            >
              <Plus className="h-4 w-4" />
            </span>
          )}
        </span>

        <h3 className={cn("mt-5 font-semibold", isFeatured ? "text-4xl lg:text-5xl" : "text-xl")}>{service.name}</h3>
        <span className={cn("mt-2 block", isFeatured ? "max-w-md text-lg text-white/75" : "flex-1 text-sm text-navy-soft")}>
          {service.description}
        </span>

        {isFeatured && service.image ? (
          <span className="relative mt-6 hidden min-h-48 w-full flex-1 overflow-hidden rounded-3xl lg:block">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 40vw, 0px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </span>
        ) : null}

        <span
          className={cn(
            "mt-5 flex w-full items-center justify-between border-t pt-4 text-sm",
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
        </span>
        <span className={cn("mt-3 text-sm font-semibold", isFeatured ? "text-sunny" : "text-coral-dark")}>
          See what&apos;s included
        </span>
      </button>
    </motion.li>
  );
}
