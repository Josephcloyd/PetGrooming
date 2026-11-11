import { describe, expect, it } from "vitest";
import { formatLongDate, getAvailableDates, parseLocalIso, toLocalIso } from "./schedule";

describe("toLocalIso / parseLocalIso", () => {
  it("round-trips a local date", () => {
    const date = new Date(2026, 10, 5);
    expect(toLocalIso(date)).toBe("2026-11-05");
    expect(parseLocalIso("2026-11-05")?.getDate()).toBe(5);
  });

  it("returns null for malformed input", () => {
    expect(parseLocalIso("not-a-date")).toBeNull();
    expect(parseLocalIso("2026-13-45")).not.toBeNull();
  });
});

describe("getAvailableDates", () => {
  it("starts tomorrow and skips Sundays", () => {
    const friday = new Date(2026, 10, 6); // Fri 6 Nov 2026
    const dates = getAvailableDates(friday, 3);

    expect(dates.map((d) => d.iso)).toEqual(["2026-11-07", "2026-11-09", "2026-11-10"]);
    expect(dates[0].weekday).toBe("Sat");
    expect(dates[0].month).toBe("Nov");
    expect(dates[0].day).toBe(7);
  });

  it("returns exactly the requested count", () => {
    expect(getAvailableDates(new Date(2026, 0, 1), 14)).toHaveLength(14);
  });

  it("honours custom closed days", () => {
    const dates = getAvailableDates(new Date(2026, 10, 6), 2, [6, 0]);
    expect(dates.map((d) => d.weekday)).toEqual(["Mon", "Tue"]);
  });
});

describe("formatLongDate", () => {
  it("formats a valid ISO date", () => {
    expect(formatLongDate("2026-11-07")).toBe("Saturday, November 7, 2026");
  });

  it("falls back to the raw string", () => {
    expect(formatLongDate("tba")).toBe("tba");
  });
});
