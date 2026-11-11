import {
  Bug,
  Droplets,
  Ear,
  PawPrint,
  Scissors,
  Sparkles,
  Toothbrush,
  Wind,
} from "lucide-react";
import type { Service } from "./types";

export const services: Service[] = [
  {
    id: "bath-blow-dry",
    name: "Bath & Blow Dry",
    description:
      "Warm hydro-bath with pH-balanced shampoo, conditioner and a gentle fluff dry.",
    startingPrice: 350,
    durationMinutes: 45,
    icon: Droplets,
    accent: "sky",
  },
  {
    id: "full-haircut",
    name: "Full Haircut",
    description:
      "Breed-standard or custom style, includes bath, brush-out, nails and ears.",
    startingPrice: 650,
    durationMinutes: 90,
    icon: Scissors,
    accent: "coral",
  },
  {
    id: "nail-trimming",
    name: "Nail Trimming",
    description:
      "Careful clip and smooth grind so there are no sharp edges on your sofa or your lap.",
    startingPrice: 150,
    durationMinutes: 15,
    icon: PawPrint,
    accent: "sunny",
  },
  {
    id: "ear-cleaning",
    name: "Ear Cleaning",
    description:
      "Gentle flush and wipe with vet-approved solution to keep ears fresh and itch-free.",
    startingPrice: 120,
    durationMinutes: 10,
    icon: Ear,
    accent: "mint",
  },
  {
    id: "de-shedding",
    name: "De-shedding Treatment",
    description:
      "Deep undercoat release with specialist tools and a shed-control conditioner.",
    startingPrice: 450,
    durationMinutes: 60,
    icon: Wind,
    accent: "sky",
  },
  {
    id: "teeth-brushing",
    name: "Teeth Brushing",
    description:
      "Enzymatic toothpaste and a soft brush for fresher breath and healthier gums.",
    startingPrice: 150,
    durationMinutes: 15,
    icon: Toothbrush,
    accent: "sunny",
  },
  {
    id: "flea-tick",
    name: "Flea & Tick Treatment",
    description:
      "Medicated bath that soothes skin and sends unwanted guests packing.",
    startingPrice: 400,
    durationMinutes: 30,
    icon: Bug,
    accent: "mint",
  },
  {
    id: "spa-package",
    name: "Spa Package",
    description:
      "Blueberry facial, paw balm, aromatherapy rinse and a bandana to go home in.",
    startingPrice: 1200,
    durationMinutes: 120,
    icon: Sparkles,
    accent: "coral",
    featured: true,
    image: {
      src: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80",
      alt: "Fluffy golden puppy wearing a red collar",
    },
  },
];

export function findService(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}
