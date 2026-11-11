import Link from "next/link";
import { footerLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <WaveDivider from="cream" to="navy" />
      <div className="bg-navy text-white">
        <Container className="grid gap-10 pt-10 pb-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div className="space-y-4">
            <Logo className="[&_span:last-child]:text-white" />
            <p className="max-w-sm text-sm text-white/70">{site.description}</p>
            <ul className="flex gap-2" aria-label="Social links">
              {site.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-coral focus-ring"
                  >
                    <link.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-4 font-display text-lg">Quick links</h2>
            <ul className="grid grid-cols-2 gap-2 text-sm text-white/70">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="rounded-md transition-colors hover:text-sunny focus-ring">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-display text-lg">Newsletter</h2>
            <NewsletterForm />
          </div>
        </Container>

        <Wordmark />

        <div className="border-t border-white/10">
          <Container className="flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.legalName}. All rights reserved.
            </p>
            <p>
              {site.address.city}, {site.address.countryName}
            </p>
          </Container>
        </div>
      </div>
    </footer>
  );
}
