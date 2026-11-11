"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { services } from "@/data/services";
import type { BookingFormValues } from "@/lib/booking/schema";
import { servicePrice } from "@/lib/pricing";
import { formatDuration, formatPrice } from "@/lib/utils";
import { ChoiceGroup, type ChoiceOption } from "./fields";

export function StepServices() {
  const { control } = useFormContext<BookingFormValues>();
  const size = useWatch({ control, name: "size" });

  const options: ChoiceOption[] = services.map((service) => ({
    value: service.id,
    label: service.name,
    hint: formatDuration(service.durationMinutes),
    icon: service.icon,
    trailing: (
      <span className="shrink-0 font-semibold text-coral-dark">{formatPrice(servicePrice(service, size))}</span>
    ),
  }));

  return (
    <div className="space-y-4">
      <p className="text-sm text-navy-soft">
        Prices shown for a <span className="font-semibold text-navy">{size}</span> pet. Pick as many as you like.
      </p>
      <ChoiceGroup name="serviceIds" label="Services" options={options} type="checkbox" columns={2} />
    </div>
  );
}
