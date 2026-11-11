"use client";

import { House, Store } from "lucide-react";
import { useFormContext, useWatch, type FieldError as RHFError } from "react-hook-form";
import { locationOptions, timeSlots } from "@/data/timeSlots";
import type { BookingFormValues } from "@/lib/booking/schema";
import { HOME_SERVICE_FEE } from "@/lib/pricing";
import { cn, formatPrice } from "@/lib/utils";
import { useAvailableDates } from "@/hooks/useAvailableDates";
import { ChoiceGroup, FieldError } from "./fields";

const locationChoices = locationOptions.map((option) => ({
  ...option,
  hint: option.value === "home" ? `${option.hint} (+${formatPrice(HOME_SERVICE_FEE)})` : option.hint,
  icon: option.value === "home" ? House : Store,
}));

const pillBase =
  "rounded-2xl border-2 px-3 py-2 text-sm font-semibold transition-colors focus-ring";
const pillIdle = "border-navy/10 bg-white text-navy hover:border-coral/50";
const pillActive = "border-coral bg-coral text-white";

export function StepSchedule() {
  const { control, setValue, formState } = useFormContext<BookingFormValues>();
  const dates = useAvailableDates();
  const [selectedDate, selectedSlot] = useWatch({ control, name: ["date", "timeSlot"] });
  const dateError = formState.errors.date as RHFError | undefined;
  const slotError = formState.errors.timeSlot as RHFError | undefined;

  const choose = (field: "date" | "timeSlot", value: string) =>
    setValue(field, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });

  return (
    <div className="space-y-8">
      <ChoiceGroup name="location" label="Where should we groom?" options={locationChoices} columns={2} />

      <div role="radiogroup" aria-labelledby="date-label" aria-describedby={dateError ? "date-error" : undefined}>
        <p id="date-label" className="mb-2 text-sm font-semibold text-navy">
          Pick a date
        </p>
        {dates.length === 0 ? (
          <p className="text-sm text-navy-soft">Loading available dates…</p>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {dates.map((date) => {
              const isActive = date.iso === selectedDate;
              return (
                <button
                  key={date.iso}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => choose("date", date.iso)}
                  className={cn(pillBase, "flex flex-col items-center leading-tight", isActive ? pillActive : pillIdle)}
                >
                  <span className="text-[11px] uppercase opacity-80">{date.weekday}</span>
                  <span className="text-lg">{date.day}</span>
                  <span className="text-[11px] opacity-80">{date.month}</span>
                </button>
              );
            })}
          </div>
        )}
        <FieldError id="date-error" error={dateError} />
      </div>

      <div role="radiogroup" aria-labelledby="slot-label" aria-describedby={slotError ? "timeSlot-error" : undefined}>
        <p id="slot-label" className="mb-2 text-sm font-semibold text-navy">
          Pick a time
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {timeSlots.map((slot) => {
            const isActive = slot === selectedSlot;
            return (
              <button
                key={slot}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => choose("timeSlot", slot)}
                className={cn(pillBase, isActive ? pillActive : pillIdle)}
              >
                {slot}
              </button>
            );
          })}
        </div>
        <FieldError id="timeSlot-error" error={slotError} />
      </div>
    </div>
  );
}
