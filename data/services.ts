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
    includes: ["pH-balanced shampoo and conditioner", "Warm hydro-bath massage", "Gentle fluff dry and brush-out", "Cologne spritz"],
    icon: Droplets,
    accent: "lagoon",
  },
  {
    id: "full-haircut",
    name: "Full Haircut",
    description:
      "Breed-standard or custom style, includes bath, brush-out, nails and ears.",
    startingPrice: 650,
    durationMinutes: 90,
    includes: ["Bath and blow dry", "Breed-standard or custom cut", "Nail trim and ear clean", "Paw and sanitary tidy"],
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
    includes: ["Careful clip and smooth grind", "Paw pad check", "Dewclaw trim"],
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
    includes: ["Vet-approved ear solution", "Gentle flush and wipe", "Quick ear health check"],
    icon: Ear,
    accent: "lagoon",
  },
  {
    id: "de-shedding",
    name: "De-shedding Treatment",
    description:
      "Deep undercoat release with specialist tools and a shed-control conditioner.",
    startingPrice: 450,
    durationMinutes: 60,
    includes: ["Undercoat rake and brush-out", "Shed-control shampoo and conditioner", "High-velocity dry to lift loose hair"],
    icon: Wind,
    accent: "lagoon",
  },
  {
    id: "teeth-brushing",
    name: "Teeth Brushing",
    description:
      "Enzymatic toothpaste and a soft brush for fresher breath and healthier gums.",
    startingPrice: 150,
    durationMinutes: 15,
    includes: ["Enzymatic pet toothpaste", "Soft-bristle brush", "Fresh-breath finish"],
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
    includes: ["Medicated, soothing bath", "Fine-comb flea check", "Tick check and removal", "Coat conditioning rinse"],
    icon: Bug,
    accent: "lagoon",
  },
  {
    id: "spa-package",
    name: "Spa Package",
    description:
      "Blueberry facial, paw balm, aromatherapy rinse and a bandana to go home in.",
    startingPrice: 1200,
    durationMinutes: 120,
    includes: ["Blueberry facial", "Paw and nose balm", "Aromatherapy rinse", "Bath, blow dry and brush-out", "Bandana to go home in"],
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
