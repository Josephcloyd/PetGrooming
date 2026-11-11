import type { PetSize, PricingPackage } from "./types";

export const sizeOptions: { value: PetSize; label: string; hint: string }[] = [
  { value: "small", label: "Small", hint: "Under 9 kg" },
  { value: "medium", label: "Medium", hint: "9 – 23 kg" },
  { value: "large", label: "Large", hint: "Over 23 kg" },
];

export const packages: PricingPackage[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "The fresh-and-clean essentials.",
    prices: { small: 499, medium: 649, large: 849 },
    features: [
      "Bath & blow dry",
      "Nail trim",
      "Ear cleaning",
      "Brush-out",
      "Cologne spritz",
    ],
  },
  {
    id: "deluxe",
    name: "Deluxe",
    tagline: "Our most-loved full groom.",
    prices: { small: 799, medium: 999, large: 1299 },
    features: [
      "Everything in Basic",
      "Full haircut & style",
      "Teeth brushing",
      "Paw pad trim",
      "Seasonal bandana",
    ],
    popular: true,
  },
  {
    id: "royal-spa",
    name: "Royal Spa",
    tagline: "The full red-carpet treatment.",
    prices: { small: 1199, medium: 1499, large: 1899 },
    features: [
      "Everything in Deluxe",
      "De-shedding treatment",
      "Blueberry facial",
      "Paw & nose balm",
      "Aromatherapy rinse",
      "Photo to take home",
    ],
  },
];
