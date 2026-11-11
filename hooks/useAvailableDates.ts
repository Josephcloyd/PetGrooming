"use client";

import { useSyncExternalStore } from "react";
import { getAvailableDates, type AvailableDate } from "@/lib/booking/schedule";

const serverSnapshot: AvailableDate[] = [];
let clientSnapshot: AvailableDate[] | null = null;

function subscribe(): () => void {
  return () => {};
}

function getClientSnapshot(): AvailableDate[] {
  if (!clientSnapshot) clientSnapshot = getAvailableDates();
  return clientSnapshot;
}

/**
 * Bookable dates computed on the client only, so a statically
 * prerendered page never ships stale dates or hydration mismatches.
 */
export function useAvailableDates(): AvailableDate[] {
  return useSyncExternalStore(subscribe, getClientSnapshot, () => serverSnapshot);
}
