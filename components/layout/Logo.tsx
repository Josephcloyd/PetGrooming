import { PawPrint } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  compact?: boolean;
  className?: string;
}

export function Logo({ compact = false, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "grid place-items-center rounded-full bg-coral text-white shadow-soft transition-all duration-300",
          compact ? "h-8 w-8" : "h-10 w-10",
        )}
      >
        <PawPrint aria-hidden="true" className={compact ? "h-4 w-4" : "h-5 w-5"} />
      </span>
      <span
        className={cn(
          "font-display font-semibold text-navy transition-all duration-300",
          compact ? "text-lg" : "text-xl",
        )}
      >
        {site.name}
      </span>
    </span>
  );
}
