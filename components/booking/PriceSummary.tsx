"use client";

import { Clock } from "lucide-react";
import type { BookingQuote } from "@/lib/pricing";
import type { PetSize } from "@/data/types";
import { formatDuration, formatPrice } from "@/lib/utils";
import { RollingPrice } from "@/components/ui/RollingPrice";

interface PriceSummaryProps {
  quote: BookingQuote;
  size: PetSize;
  petName?: string;
}

export function PriceSummary({ quote, size, petName }: PriceSummaryProps) {
  const hasLines = quote.lines.length > 0;

  return (
    <aside aria-labelledby="summary-heading" className="rounded-3xl bg-navy p-6 text-white shadow-lift">
      <h2 id="summary-heading" className="font-display text-lg font-semibold">
        {petName ? `${petName}'s visit` : "Your visit"}
      </h2>
      <p className="mt-0.5 text-xs uppercase tracking-wide text-white/60">{size} pet pricing</p>

      <div aria-live="polite" aria-atomic="true">
        {hasLines ? (
          <ul className="mt-4 space-y-2 text-sm">
            {quote.lines.map((line) => (
              <li key={line.id} className="flex justify-between gap-3">
                <span className="text-white/80">{line.name}</span>
                <span className="font-semibold">{formatPrice(line.price)}</span>
              </li>
            ))}
            {quote.homeServiceFee > 0 ? (
              <li className="flex justify-between gap-3">
                <span className="text-white/80">Home service travel fee</span>
                <span className="font-semibold">{formatPrice(quote.homeServiceFee)}</span>
              </li>
            ) : null}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-white/60">Pick a service to see your running total.</p>
        )}

        <div className="mt-5 flex items-end justify-between border-t border-white/15 pt-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/60">Estimated total</p>
            <RollingPrice value={quote.total} className="font-display text-4xl font-semibold" />
          </div>
          {quote.durationMinutes > 0 ? (
            <p className="inline-flex items-center gap-1 text-sm text-white/70">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {formatDuration(quote.durationMinutes)}
            </p>
          ) : null}
        </div>
      </div>
      <p className="mt-3 text-xs text-white/50">Final price confirmed at the studio after a quick coat check.</p>
    </aside>
  );
}
