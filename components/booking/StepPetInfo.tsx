"use client";

import { Cat, Dog } from "lucide-react";
import { sizeOptions } from "@/data/pricing";
import { ChoiceGroup, TextField } from "./fields";

const petTypeOptions = [
  { value: "dog", label: "Dog", hint: "All breeds and mixes", icon: Dog },
  { value: "cat", label: "Cat", hint: "Calm-room grooming", icon: Cat },
];

export function StepPetInfo() {
  return (
    <div className="space-y-6">
      <TextField name="petName" label="Pet's name" placeholder="e.g. Luna" autoComplete="off" />
      <ChoiceGroup name="petType" label="Pet type" options={petTypeOptions} columns={2} />
      <TextField name="breed" label="Breed" placeholder="e.g. Goldendoodle, or 'mixed'" autoComplete="off" />
      <ChoiceGroup name="size" label="Size" options={sizeOptions} />
      <TextField
        name="age"
        label="Age (years)"
        type="number"
        inputMode="numeric"
        placeholder="e.g. 3"
        hint="Puppies and kittens under 1 can enter 0."
        registerOptions={{ valueAsNumber: true }}
      />
    </div>
  );
}
