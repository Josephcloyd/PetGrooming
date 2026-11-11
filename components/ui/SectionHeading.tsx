import type { ReactNode } from "react";
import { PawPrint } from "lucide-react";
import { cn } from "@/lib/utils";
import { HighlightWord } from "./Squiggle";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** A phrase inside `title` that gets the animated squiggle underline. */
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
}

function renderTitle(title: string, highlight?: string): ReactNode {
  if (!highlight) return title;
  const index = title.indexOf(highlight);
  if (index === -1) return title;
  return (
    <>
      {title.slice(0, index)}
      <HighlightWord>{highlight}</HighlightWord>
      {title.slice(index + highlight.length)}
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  tone = "light",
  className,
  id,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]",
            isDark ? "text-sunny" : "text-coral-dark",
          )}
        >
          <PawPrint className="h-4 w-4" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl",
          isDark ? "text-white" : "text-navy",
        )}
      >
        {renderTitle(title, highlight)}
      </h2>
      {description ? (
        <p className={cn("mt-5 text-lg", isDark ? "text-white/70" : "text-navy-soft")}>{description}</p>
      ) : null}
    </div>
  );
}
