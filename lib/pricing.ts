import type { PetSize, PricingPackage, Service } from "@/data/types";

/** Medium and large pets take longer and use more product. */
export const SIZE_MULTIPLIER: Record<PetSize, number> = {
  small: 1,
  medium: 1.25,
  large: 1.5,
};

/** Flat travel fee (₱) added when the groomer comes to the client's home. */
export const HOME_SERVICE_FEE = 300;

/** Size-adjusted prices are rounded to the nearest ₱10 so they read as clean shop prices. */
export const PRICE_STEP = 10;

export function servicePrice(service: Pick<Service, "startingPrice">, size: PetSize): number {
  return Math.round((service.startingPrice * SIZE_MULTIPLIER[size]) / PRICE_STEP) * PRICE_STEP;
}

export function packagePrice(pkg: Pick<PricingPackage, "prices">, size: PetSize): number {
  return pkg.prices[size];
}

export function selectedServices(serviceIds: readonly string[], catalog: readonly Service[]): Service[] {
  return catalog.filter((service) => serviceIds.includes(service.id));
}

export function servicesSubtotal(
  serviceIds: readonly string[],
  size: PetSize,
  catalog: readonly Service[],
): number {
  return selectedServices(serviceIds, catalog).reduce(
    (sum, service) => sum + servicePrice(service, size),
    0,
  );
}

export function servicesDuration(serviceIds: readonly string[], catalog: readonly Service[]): number {
  return selectedServices(serviceIds, catalog).reduce(
    (sum, service) => sum + service.durationMinutes,
    0,
  );
}

export type BookingQuote = {
  lines: { id: string; name: string; price: number }[];
  subtotal: number;
  homeServiceFee: number;
  total: number;
  durationMinutes: number;
};

export function bookingQuote(input: {
  serviceIds: readonly string[];
  size: PetSize;
  homeService: boolean;
  catalog: readonly Service[];
}): BookingQuote {
  const chosen = selectedServices(input.serviceIds, input.catalog);
  const lines = chosen.map((service) => ({
    id: service.id,
    name: service.name,
    price: servicePrice(service, input.size),
  }));
  const subtotal = lines.reduce((sum, line) => sum + line.price, 0);
  const homeServiceFee = input.homeService && chosen.length > 0 ? HOME_SERVICE_FEE : 0;
  return {
    lines,
    subtotal,
    homeServiceFee,
    total: subtotal + homeServiceFee,
    durationMinutes: chosen.reduce((sum, service) => sum + service.durationMinutes, 0),
  };
}
