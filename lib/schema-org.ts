import { site, type SiteConfig } from "@/data/site";
import { services } from "@/data/services";
import type { Service } from "@/data/types";
import { CURRENCY_CODE } from "@/lib/utils";

export function buildLocalBusinessSchema(
  config: SiteConfig = site,
  catalog: readonly Service[] = services,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${config.url}/#business`,
    name: config.name,
    legalName: config.legalName,
    description: config.description,
    url: config.url,
    telephone: config.phone,
    email: config.email,
    image: config.heroImage.src,
    priceRange: config.priceRange,
    foundingDate: String(config.foundedYear),
    address: {
      "@type": "PostalAddress",
      ...(config.address.street ? { streetAddress: config.address.street } : {}),
      addressLocality: config.address.city,
      addressRegion: config.address.region,
      postalCode: config.address.postalCode,
      addressCountry: config.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.geo.latitude,
      longitude: config.geo.longitude,
    },
    openingHoursSpecification: config.openingHoursSpecification.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      ...spec,
    })),
    sameAs: config.social.map((link) => link.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Grooming services",
      itemListElement: catalog.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.name, description: service.description },
        price: service.startingPrice,
        priceCurrency: CURRENCY_CODE,
      })),
    },
  };
}

/** Serialises JSON-LD safely for a <script> tag. */
export function serializeJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
