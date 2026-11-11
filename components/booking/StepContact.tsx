"use client";

import { TextField } from "./fields";

export function StepContact() {
  return (
    <div className="space-y-6">
      <TextField name="ownerName" label="Your name" placeholder="Jess Rivera" autoComplete="name" />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="email" label="Email" type="email" inputMode="email" placeholder="you@example.com" autoComplete="email" />
        <TextField name="phone" label="Phone" type="tel" inputMode="tel" placeholder="0912 345 6789" autoComplete="tel" />
      </div>
      <TextField
        name="notes"
        label="Anything we should know? (optional)"
        placeholder="Allergies, nervous around dryers, favourite treats…"
        multiline
      />
    </div>
  );
}
