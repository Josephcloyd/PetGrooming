import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  tone?: "sunny" | "coral" | "lagoon" | "navy";
  className?: string;
}

const tones = {
  sunny: "bg-sunny text-navy",
  coral: "bg-coral text-navy",
  lagoon: "bg-lagoon-light text-navy",
  navy: "bg-navy text-white",
};

export function Badge({ children, tone = "sunny", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
