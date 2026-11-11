import { describe, expect, it } from "vitest";
import { Droplets } from "lucide-react";
import type { Service } from "@/data/types";
import {
  HOME_SERVICE_FEE,
  bookingQuote,
  packagePrice,
  servicePrice,
  servicesDuration,
  servicesSubtotal,
} from "./pricing";

const catalog: Service[] = [
  { id: "bath", name: "Bath", description: "", startingPrice: 350, durationMinutes: 45, icon: Droplets, accent: "sky" },
  { id: "nails", name: "Nails", description: "", startingPrice: 150, durationMinutes: 15, icon: Droplets, accent: "sunny" },
];

describe("servicePrice", () => {
  it("returns the starting price for small pets", () => {
    expect(servicePrice(catalog[0], "small")).toBe(350);
  });

  it("scales medium and large pets and rounds to the nearest ten pesos", () => {
    expect(servicePrice({ startingPrice: 350 }, "medium")).toBe(440);
    expect(servicePrice({ startingPrice: 350 }, "large")).toBe(530);
    expect(servicePrice({ startingPrice: 150 }, "large")).toBe(230);
  });
});

describe("packagePrice", () => {
  it("reads the explicit per-size price", () => {
    expect(packagePrice({ prices: { small: 499, medium: 649, large: 849 } }, "large")).toBe(849);
  });
});

describe("servicesSubtotal and servicesDuration", () => {
  it("sums only the selected services", () => {
    expect(servicesSubtotal(["bath", "nails"], "small", catalog)).toBe(500);
    expect(servicesDuration(["nails"], catalog)).toBe(15);
  });

  it("ignores unknown ids", () => {
    expect(servicesSubtotal(["nope"], "small", catalog)).toBe(0);
    expect(servicesDuration([], catalog)).toBe(0);
  });
});

describe("bookingQuote", () => {
  it("builds line items with a size-adjusted total", () => {
    const quote = bookingQuote({ serviceIds: ["bath", "nails"], size: "large", homeService: false, catalog });

    expect(quote.lines).toEqual([
      { id: "bath", name: "Bath", price: 530 },
      { id: "nails", name: "Nails", price: 230 },
    ]);
    expect(quote.subtotal).toBe(760);
    expect(quote.homeServiceFee).toBe(0);
    expect(quote.total).toBe(760);
    expect(quote.durationMinutes).toBe(60);
  });

  it("adds the home service fee only when services are selected", () => {
    const withServices = bookingQuote({ serviceIds: ["bath"], size: "small", homeService: true, catalog });
    const withoutServices = bookingQuote({ serviceIds: [], size: "small", homeService: true, catalog });

    expect(withServices.homeServiceFee).toBe(HOME_SERVICE_FEE);
    expect(withServices.total).toBe(350 + HOME_SERVICE_FEE);
    expect(withoutServices.total).toBe(0);
  });
});
