"use client";

import { useId, useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { z } from "zod";

const emailSchema = z.email("Enter a valid email address");

export function NewsletterForm() {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = emailSchema.safeParse(email.trim());
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Enter a valid email address");
      return;
    }
    setError(null);
    setIsSubscribed(true);
  };

  if (isSubscribed) {
    return (
      <p role="status" className="flex items-center gap-2 text-sm text-mint">
        <Check className="h-4 w-4" aria-hidden="true" />
        You&apos;re on the list. Treats incoming.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium text-white/80">
        Grooming tips and seasonal offers, once a month.
      </label>
      <div className="flex gap-2">
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral"
        />
        <button
          type="submit"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral text-white transition-colors hover:bg-coral-dark focus-ring"
          aria-label="Subscribe"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-sm text-sunny">
          {error}
        </p>
      ) : null}
    </form>
  );
}
