import type { TeamMember } from "./types";

const unsplash = (id: string): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

export const team: TeamMember[] = [
  {
    id: "maya",
    name: "Maya Chen",
    role: "Lead Groomer & Founder",
    specialty: "Doodles & curly coats",
    yearsExperience: 11,
    image: unsplash("photo-1494790108377-be9c29b29330"),
    funFact: "Has groomed over 2,000 doodles and still loves every one.",
  },
  {
    id: "diego",
    name: "Diego Alvarez",
    role: "Senior Stylist",
    specialty: "Breed-standard cuts",
    yearsExperience: 8,
    image: unsplash("photo-1507003211169-0a1dd7228f2d"),
    funFact: "Certified in Asian fusion styling and show-cut terriers.",
  },
  {
    id: "priya",
    name: "Priya Patel",
    role: "Cat Specialist",
    specialty: "Nervous cats & kittens",
    yearsExperience: 6,
    image: unsplash("photo-1438761681033-6461ffad8d80"),
    funFact: "Speaks fluent cat. Allegedly.",
  },
  {
    id: "sam",
    name: "Sam Okafor",
    role: "Mobile Groomer",
    specialty: "Home visits & seniors",
    yearsExperience: 5,
    image: unsplash("photo-1500648767791-00dcc994a43e"),
    funFact: "Drives the van with the paw-print wrap you may have spotted around town.",
  },
];
