import { describe, expect, it } from "vitest";
import { faqs } from "./faqs";
import { galleryPhotos, beforeAfterPairs } from "./gallery";
import { navLinks } from "./navigation";
import { packages } from "./pricing";
import { findService, services } from "./services";
import { processSteps } from "./steps";
import { team } from "./team";

function ids(items: { id: string }[]): string[] {
  return items.map((item) => item.id);
}

describe("content data", () => {
  it("uses unique ids in every collection", () => {
    for (const collection of [services, packages, faqs, galleryPhotos, beforeAfterPairs, processSteps, team]) {
      const list = ids(collection);
      expect(new Set(list).size).toBe(list.length);
    }
  });

  it("marks exactly one package as most popular", () => {
    expect(packages.filter((pkg) => pkg.popular)).toHaveLength(1);
  });

  it("prices packages in ascending size order", () => {
    for (const pkg of packages) {
      expect(pkg.prices.small).toBeLessThan(pkg.prices.medium);
      expect(pkg.prices.medium).toBeLessThan(pkg.prices.large);
    }
  });

  it("gives every image an alt text and an https source", () => {
    for (const photo of galleryPhotos) {
      expect(photo.alt.length).toBeGreaterThan(5);
      expect(photo.src.startsWith("https://")).toBe(true);
    }
  });

  it("only links to in-page anchors from the navbar", () => {
    for (const link of navLinks) expect(link.href).toMatch(/^\/#/);
  });

  it("finds services by id", () => {
    expect(findService("spa-package")?.name).toBe("Spa Package");
    expect(findService("missing")).toBeUndefined();
  });
});
