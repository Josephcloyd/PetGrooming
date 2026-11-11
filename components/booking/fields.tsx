"use client";

import type { ComponentType, ReactNode } from "react";
import { useFormContext, type FieldError as RHFError, type RegisterOptions } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { BookingField, BookingFormValues } from "@/lib/booking/schema";

interface FieldErrorProps {
  id: string;
  error?: RHFError;
}

export function FieldError({ id, error }: FieldErrorProps) {
  if (!error?.message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-coral-dark">
      {error.message}
    </p>
  );
}

interface TextFieldProps {
  name: BookingField;
  label: string;
  type?: "text" | "email" | "tel" | "number";
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  registerOptions?: RegisterOptions<BookingFormValues, BookingField>;
  multiline?: boolean;
}

export const inputClass =
  "w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-navy shadow-sm placeholder:text-navy/35 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/40 aria-[invalid=true]:border-coral-dark";

export function TextField({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  hint,
  inputMode,
  registerOptions,
  multiline = false,
}: TextFieldProps) {
  const { register, formState } = useFormContext<BookingFormValues>();
  const error = formState.errors[name] as RHFError | undefined;
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
  const common = {
    id: name,
    placeholder,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: inputClass,
    ...register(name, registerOptions),
  };

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </label>
      {multiline ? <textarea rows={4} {...common} /> : <input type={type} inputMode={inputMode} {...common} />}
      {hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-navy-soft">
          {hint}
        </p>
      ) : null}
      <FieldError id={errorId} error={error} />
    </div>
  );
}

export interface ChoiceOption {
  value: string;
  label: string;
  hint?: string;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  trailing?: ReactNode;
}

interface ChoiceGroupProps {
  name: BookingField;
  label: string;
  options: ChoiceOption[];
  type?: "radio" | "checkbox";
  columns?: 2 | 3;
}

/** Card-style radios or checkboxes; native inputs keep keyboard support. */
export function ChoiceGroup({ name, label, options, type = "radio", columns = 3 }: ChoiceGroupProps) {
  const { register, formState } = useFormContext<BookingFormValues>();
  const error = formState.errors[name] as RHFError | undefined;
  const errorId = `${name}-error`;

  return (
    <fieldset aria-describedby={error ? errorId : undefined} aria-invalid={error ? true : undefined}>
      <legend className="mb-2 text-sm font-semibold text-navy">{label}</legend>
      <div className={cn("grid gap-3", columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3")}>
        {options.map((option) => {
          const Icon = option.icon;
          const id = `${name}-${option.value}`;
          return (
            <label key={option.value} htmlFor={id} className="relative block cursor-pointer">
              <input id={id} type={type} value={option.value} className="peer sr-only" {...register(name)} />
              <span className="flex h-full items-center gap-3 rounded-2xl border-2 border-navy/10 bg-white p-4 transition-all peer-checked:border-coral peer-checked:bg-coral-light/40 peer-focus-visible:ring-2 peer-focus-visible:ring-coral peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-cream hover:border-coral/50">
                {Icon ? (
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cream text-coral-dark">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                ) : null}
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-navy">{option.label}</span>
                  {option.hint ? <span className="block text-xs text-navy-soft">{option.hint}</span> : null}
                </span>
                {option.trailing}
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id={errorId} error={error} />
    </fieldset>
  );
}
