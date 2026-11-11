"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { tapScale } from "@/lib/animations";

const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-coral text-white shadow-soft hover:bg-coral-dark",
  secondary: "bg-white text-navy ring-1 ring-navy/10 hover:bg-cream-dark",
  ghost: "text-navy hover:bg-coral-light/60",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

interface NativeButtonProps extends BaseProps {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

export type ButtonProps = LinkButtonProps | NativeButtonProps;

function classes(variant: Variant, size: Size, className?: string): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-ring disabled:pointer-events-none disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export function Button(props: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const { variant = "primary", size = "md", className, children } = props;
  const tap = reduceMotion ? undefined : tapScale;
  const cls = classes(variant, size, className);

  if (props.href !== undefined) {
    return (
      <MotionLink
        href={props.href}
        onClick={props.onClick}
        target={props.target}
        rel={props.rel}
        aria-label={props["aria-label"]}
        className={cls}
        whileTap={tap}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props["aria-label"]}
      className={cls}
      whileTap={props.disabled ? undefined : tap}
    >
      {children}
    </motion.button>
  );
}
