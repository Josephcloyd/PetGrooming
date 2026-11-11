import { describe, expect, it } from "vitest";
import { cn, formatDuration, formatPrice } from "./utils";

describe("cn", () => {
  it("merges conflicting tailwind classes, last wins", () => {
    expect(cn("px-2", "px-4", false && "hidden")).toBe("px-4");
  });
});

describe("formatPrice", () => {
  it("formats whole pesos without centavos", () => {
    expect(formatPrice(450)).toBe("₱450");
    expect(formatPrice(1250)).toBe("₱1,250");
  });
});

describe("formatDuration", () => {
  it("formats minutes, whole hours and mixed", () => {
    expect(formatDuration(45)).toBe("45 min");
    expect(formatDuration(120)).toBe("2 hr");
    expect(formatDuration(90)).toBe("1 hr 30 min");
  });
});
