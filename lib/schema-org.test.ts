import { describe, expect, it } from "vitest";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { buildLocalBusinessSchema, serializeJsonLd } from "./schema-org";

describe("buildLocalBusinessSchema", () => {
  it("maps site config into a LocalBusiness node", () => {
    const schema = buildLocalBusinessSchema();

    expect(schema["@type"]).toBe("LocalBusiness");
    expect(schema.name).toBe(site.name);
    expect(schema.address).toMatchObject({ addressLocality: site.address.city });
    expect(schema.sameAs).toEqual(site.social.map((s) => s.href));
  });

  it("does not publish a rating the business has not earned", () => {
    expect(buildLocalBusinessSchema()).not.toHaveProperty("aggregateRating");
  });

  it("lists every service as an offer", () => {
    const schema = buildLocalBusinessSchema();
    const catalog = schema.hasOfferCatalog as { itemListElement: unknown[] };
    expect(catalog.itemListElement).toHaveLength(services.length);
  });
});

describe("serializeJsonLd", () => {
  it("escapes angle brackets so the script tag cannot be closed early", () => {
    const output = serializeJsonLd({ name: "</script><b>" });
    expect(output).not.toContain("</script>");
    expect(output).toContain("\\u003c/script>");
  });
});
