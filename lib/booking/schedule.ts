export type AvailableDate = {
  /** Local calendar date as YYYY-MM-DD. */
  iso: string;
  weekday: string;
  day: number;
  month: string;
};

const SUNDAY = 0;
const DEFAULT_CLOSED_DAYS: readonly number[] = [SUNDAY];

const weekdayFormat = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const monthFormat = new Intl.DateTimeFormat("en-US", { month: "short" });
const longFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function toLocalIso(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseLocalIso(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const [, year, month, day] = match;
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + days);
  return next;
}

/**
 * Returns the next `count` bookable dates starting tomorrow,
 * skipping closed weekdays (Sunday by default).
 */
export function getAvailableDates(
  from: Date = new Date(),
  count = 14,
  closedDays: readonly number[] = DEFAULT_CLOSED_DAYS,
): AvailableDate[] {
  const dates: AvailableDate[] = [];
  let offset = 1;
  while (dates.length < count) {
    const candidate = addDays(from, offset);
    offset += 1;
    if (closedDays.includes(candidate.getDay())) continue;
    dates.push({
      iso: toLocalIso(candidate),
      weekday: weekdayFormat.format(candidate),
      day: candidate.getDate(),
      month: monthFormat.format(candidate),
    });
  }
  return dates;
}

export function formatLongDate(iso: string): string {
  const parsed = parseLocalIso(iso);
  return parsed ? longFormat.format(parsed) : iso;
}
