import type { NavLink } from "./types";

export const navLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

export const footerLinks: NavLink[] = [
  ...navLinks,
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Book online", href: "/booking" },
];
