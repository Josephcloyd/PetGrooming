"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { navLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { springSnappy } from "@/lib/animations";
import { SITE_HEADER_TRANSITION } from "@/lib/transitions";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { Button } from "@/components/ui/Button";
import { HamburgerButton } from "./HamburgerButton";
import { Logo } from "./Logo";
import { MobileDrawer } from "./MobileDrawer";

/** Floating pill navbar with a highlight that slides between hovered links. */
export function Navbar() {
  const isScrolled = useScrolled(24);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4" style={{ viewTransitionName: SITE_HEADER_TRANSITION }}>
        <div
          className={cn(
            "mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/70 pl-3 pr-2 transition-all duration-300 sm:pl-4",
            isScrolled ? "bg-white/90 py-1.5 shadow-lift backdrop-blur-md" : "bg-white/55 py-2.5 shadow-soft backdrop-blur-sm",
          )}
        >
          <Link href="/" aria-label={`${site.name} home`} className="rounded-full focus-ring">
            <Logo compact={isScrolled} />
          </Link>

          <nav aria-label="Primary" className="hidden md:block" onMouseLeave={() => setHoveredHref(null)}>
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHoveredHref(link.href)}
                    onFocus={() => setHoveredHref(link.href)}
                    onBlur={() => setHoveredHref(null)}
                    className="relative z-10 block rounded-full px-4 py-2 text-sm font-semibold text-navy-soft transition-colors hover:text-navy focus-ring"
                  >
                    {link.label}
                  </Link>
                  {hoveredHref === link.href ? (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-coral-light"
                      transition={springSnappy}
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/booking" size="sm" className="hidden md:inline-flex">
              Book Now
            </Button>
            <HamburgerButton isOpen={isMenuOpen} onToggle={() => setIsMenuOpen((open) => !open)} />
          </div>
        </div>
      </header>
      <div id="mobile-menu">
        <MobileDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </>
  );
}
