import { PawPrint } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinningBadgeProps {
  text?: string;
  className?: string;
}

/** Round sticker with text that slowly spins around a paw. */
export function SpinningBadge({ text = "Bathe • Brush • Pamper • ", className }: SpinningBadgeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("grid h-28 w-28 place-items-center rounded-full bg-sunny shadow-lift sm:h-32 sm:w-32", className)}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow motion-reduce:animate-none">
        <defs>
          <path id="spinning-badge-circle" d="M50 50 m -36 0 a 36 36 0 1 1 72 0 a 36 36 0 1 1 -72 0" />
        </defs>
        <text className="fill-navy font-display text-[10px] font-semibold uppercase" letterSpacing="2">
          <textPath href="#spinning-badge-circle">{text}</textPath>
        </text>
      </svg>
      <PawPrint className="h-8 w-8 text-coral" />
    </div>
  );
}
