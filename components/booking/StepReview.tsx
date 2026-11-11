"use client";

import { useFormContext, useWatch, type FieldError as RHFError } from "react-hook-form";
import { findService } from "@/data/services";
import { locationOptions } from "@/data/timeSlots";
import { bookingDefaults, type BookingFormValues } from "@/lib/booking/schema";
import { formatLongDate } from "@/lib/booking/schedule";
import { FieldError } from "./fields";

interface ReviewRowProps {
  label: string;
  value: string;
}

function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:justify-between sm:gap-6">
      <dt className="text-sm text-navy-soft">{label}</dt>
      <dd className="text-sm font-semibold text-navy sm:text-right">{value}</dd>
    </div>
  );
}

export function StepReview() {
  const { control, register, formState } = useFormContext<BookingFormValues>();
  const watched = useWatch({ control });
  const values = { ...bookingDefaults, ...watched, serviceIds: watched.serviceIds ?? [] };
  const error = formState.errors.agreePolicy as RHFError | undefined;
  const serviceNames = values.serviceIds.map((id) => findService(id)?.name ?? id).join(", ");
  const location = locationOptions.find((option) => option.value === values.location)?.label ?? values.location;

  return (
    <div className="space-y-6">
      <dl className="divide-y divide-navy/10 rounded-2xl bg-white px-5 shadow-sm">
        <ReviewRow label="Pet" value={`${values.petName} · ${values.petType} · ${values.breed} · ${values.size} · ${values.age ?? "?"} yrs`} />
        <ReviewRow label="Services" value={serviceNames} />
        <ReviewRow label="When" value={`${formatLongDate(values.date)} at ${values.timeSlot}`} />
        <ReviewRow label="Where" value={location} />
        <ReviewRow label="Owner" value={`${values.ownerName} · ${values.email} · ${values.phone}`} />
        {values.notes ? <ReviewRow label="Notes" value={values.notes} /> : null}
      </dl>

      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-navy/10 bg-white p-4 has-[:checked]:border-coral">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-coral focus-ring"
            aria-describedby={error ? "agreePolicy-error" : undefined}
            aria-invalid={error ? true : undefined}
            {...register("agreePolicy")}
          />
          <span className="text-sm text-navy">
            I confirm my pet&apos;s vaccinations are current and I accept the 24-hour cancellation policy.
          </span>
        </label>
        <FieldError id="agreePolicy-error" error={error} />
      </div>
    </div>
  );
}
