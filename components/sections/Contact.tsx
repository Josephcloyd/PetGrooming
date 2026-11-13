import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapCard } from "./MapCard";

interface InfoTileProps {
  icon: LucideIcon;
  title: string;
  tint: string;
  children: ReactNode;
}

function InfoTile({ icon: Icon, title, tint, children }: InfoTileProps) {
  return (
    <div className="flex gap-4 rounded-3xl bg-white p-5 shadow-soft">
      <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-navy", tint)}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-lg font-semibold text-navy">{title}</p>
        <div className="text-navy-soft">{children}</div>
      </div>
    </div>
  );
}

const linkClass = "break-all rounded-md hover:text-coral-dark focus-ring";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <AnimatedSection>
          <SectionHeading
            id="contact-heading"
            eyebrow="Contact & location"
            title={`Find us in ${site.address.city}`}
            description="Pop in for a visit, give us a call, or send your questions by email."
          />
        </AnimatedSection>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <AnimatedSection className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <address className="contents not-italic">
              <InfoTile icon={MapPin} title="Studio" tint="bg-coral-light">
                <p>
                  {site.address.street ? (
                    <>
                      {site.address.street}
                      <br />
                    </>
                  ) : null}
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                  <br />
                  {site.address.countryName}
                </p>
              </InfoTile>
              <InfoTile icon={Phone} title="Phone" tint="bg-sunny-light">
                <a href={site.phoneHref} className={linkClass}>
                  {site.phone}
                </a>
              </InfoTile>
              <InfoTile icon={Mail} title="Email" tint="bg-lagoon-light">
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </InfoTile>
            </address>
            <InfoTile icon={Clock} title="Hours" tint="bg-sunny-light">
              <table className="mt-1 w-full text-sm">
                <tbody>
                  {site.hours.map((row) => (
                    <tr key={row.days}>
                      <th scope="row" className="py-0.5 pr-4 text-left font-medium">
                        {row.days}
                      </th>
                      <td className="py-0.5">{row.open ? `${row.open} – ${row.close}` : "Closed"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </InfoTile>
            <ul className="flex gap-2 sm:col-span-2 lg:col-span-1" aria-label="Social links">
              {site.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="grid h-11 w-11 place-items-center rounded-full bg-white text-navy shadow-soft transition-colors hover:bg-coral hover:text-navy focus-ring"
                  >
                    <link.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <MapCard />
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
