import type { ComponentType, SVGProps } from "react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/decor/SocialIcons";

type SocialLink = { name: string; href: string; icon: ComponentType<SVGProps<SVGSVGElement>> };
type BusinessHours = { days: string; open: string | null; close: string | null };

/**
 * Single source of truth for business details.
 * Change the name, city and contact info here and it updates everywhere
 * (navbar, hero, contact, footer, metadata and JSON-LD).
 */
export const site = {
  name: "Pampered Paws",
  legalName: "Pampered Paws Grooming Studio",
  headline: { lead: "Pampered Paws,", highlight: "Happy Tails" },
  subheadline:
    "A calm, spa-style grooming studio where dogs and cats get gentle hands, premium products and a whole lot of love.",
  description:
    "Premium, gentle pet grooming in Cebu City, Philippines. Baths, haircuts, nail trims, de-shedding and spa packages for dogs and cats. Book online in minutes.",
  url: "https://pamperedpaws.example.com",
  /** Sample Philippine mobile number. Replace with the real one. */
  phone: "+63 912 345 6789",
  phoneHref: "tel:+639123456789",
  email: "hello@pamperedpaws.example.com",
  /** General area only. Add a street when you're ready to publish the exact studio location. */
  address: {
    street: "",
    city: "Cebu City",
    region: "Cebu",
    postalCode: "6000",
    country: "PH",
    countryName: "Philippines",
  },
  geo: { latitude: 10.3157, longitude: 123.8854 },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cebu+City+Philippines",
  hours: [
    { days: "Monday – Friday", open: "8:00 AM", close: "6:00 PM" },
    { days: "Saturday", open: "9:00 AM", close: "4:00 PM" },
    { days: "Sunday", open: null, close: null },
  ] as BusinessHours[],
  openingHoursSpecification: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    { dayOfWeek: ["Saturday"], opens: "09:00", closes: "16:00" },
  ],
  social: [
    { name: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
    { name: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
    { name: "YouTube", href: "https://youtube.com", icon: YoutubeIcon },
  ] as SocialLink[],
  priceRange: "₱₱",
  foundedYear: 2021,
  heroImage: {
    src: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80",
    alt: "Golden retriever puppy sitting on a patio with a tulip in its mouth",
  },
};

export type SiteConfig = typeof site;
