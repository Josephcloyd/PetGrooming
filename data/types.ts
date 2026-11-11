import type { LucideIcon } from "lucide-react";

export type PetSize = "small" | "medium" | "large";
export type PetType = "dog" | "cat";

export type Service = {
  id: string;
  name: string;
  description: string;
  /** Price for a small pet. Medium and large are derived via SIZE_MULTIPLIER. */
  startingPrice: number;
  durationMinutes: number;
  icon: LucideIcon;
  accent: "coral" | "sunny" | "mint" | "sky";
  /** Shown as the large tile in the services bento grid. */
  featured?: boolean;
  /** Photo shown inside the featured tile on large screens. */
  image?: { src: string; alt: string };
};

export type PricingPackage = {
  id: string;
  name: string;
  tagline: string;
  prices: Record<PetSize, number>;
  features: string[];
  popular?: boolean;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BeforeAfterPair = {
  id: string;
  petName: string;
  /** True when the pair is an edited illustration rather than real photos of one pet. Shows a label. */
  isSample?: boolean;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  yearsExperience: number;
  image: string;
  funFact: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type NavLink = { label: string; href: string };
