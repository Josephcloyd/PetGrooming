import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

/* jsdom lacks these browser APIs that Motion and next/image touch. */
class ObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): never[] {
    return [];
  }
}

Object.defineProperty(window, "IntersectionObserver", { writable: true, value: ObserverStub });
Object.defineProperty(window, "ResizeObserver", { writable: true, value: ObserverStub });

/* Report "reduced motion" so components take their instant paths in tests. */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, "scrollTo", { writable: true, value: vi.fn() });
Element.prototype.scrollIntoView = vi.fn();
