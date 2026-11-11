import { CalendarCheck, Car, Heart, Sparkles } from "lucide-react";
import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    id: "book",
    title: "Book online",
    description: "Pick your services, a date and a time slot in under two minutes.",
    icon: CalendarCheck,
  },
  {
    id: "dropoff",
    title: "Drop off or home service",
    description: "Bring your pet to the studio, or let our mobile groomer come to you.",
    icon: Car,
  },
  {
    id: "pamper",
    title: "Pamper session",
    description: "Warm bath, gentle hands, breed-aware styling and plenty of treats.",
    icon: Sparkles,
  },
  {
    id: "pickup",
    title: "Happy pickup",
    description: "Collect a fluffy, fresh-smelling best friend and a report card.",
    icon: Heart,
  },
];
