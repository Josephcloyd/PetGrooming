"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { PetSize, PricingPackage } from "@/data/types";
import { cardHover, fadeUp, springSoft } from "@/lib/animations";
import { packagePrice } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RollingPrice } from "@/components/ui/RollingPrice";

interface PricingCardProps {
  pkg: PricingPackage;
  size: PetSize;
}

export function PricingCard({ pkg, size }: PricingCardProps) {
  const reduceMotion = useReducedMotion();
  const isPopular = Boolean(pkg.popular);

  return (
    <motion.li
      variants={fadeUp}
      whileHover={reduceMotion ? undefined : cardHover}
      transition={springSoft}
      className={cn(
        "relative flex h-full flex-col rounded-[2rem] p-8 shadow-soft transition-shadow hover:shadow-lift",
        isPopular ? "bg-navy text-white ring-2 ring-coral ring-offset-4 ring-offset-cream lg:-my-5 lg:py-12" : "bg-white text-navy",
      )}
      data-testid={`pricing-card-${pkg.id}`}
    >
      {isPopular ? (
        <>
          <Badge tone="coral" className="absolute -top-3 left-1/2 -translate-x-1/2 overflow-hidden">
            Most popular
          </Badge>
        </>
      ) : null}

      <h3 className="text-3xl font-semibold">{pkg.name}</h3>
      <p className={cn("mt-1 text-sm", isPopular ? "text-white/70" : "text-navy-soft")}>{pkg.tagline}</p>

      <p className="mt-7 flex flex-wrap items-baseline gap-x-2">
        <RollingPrice value={packagePrice(pkg, size)} className="font-display text-6xl font-semibold" />
        <span className={cn("text-sm", isPopular ? "text-white/70" : "text-navy-soft")}>/ {size} pet</span>
      </p>

      <ul className="mt-7 flex-1 space-y-3 text-sm">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                isPopular ? "bg-sunny text-navy" : "bg-coral-light text-coral-dark",
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <Button href="/booking" variant={isPopular ? "primary" : "secondary"} className="mt-8 w-full">
        Choose {pkg.name}
      </Button>
    </motion.li>
  );
}
