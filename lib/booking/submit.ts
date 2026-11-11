import type { BookingFormValues } from "./schema";

export type BookingSubmission = BookingFormValues & {
  total: number;
  submittedAt: string;
};

export type SubmitResult =
  | { success: true; bookingId: string }
  | { success: false; error: string };

export type BookingAdapter = (payload: BookingSubmission) => Promise<SubmitResult>;

const SIMULATED_LATENCY_MS = 900;

/**
 * Front-end only adapter. Resolves locally with a generated reference.
 *
 * To connect a backend, write another adapter and pass it to `submitBooking`
 * (or change the default below). Examples:
 *
 *   API route:  fetch("/api/bookings", { method: "POST", body: JSON.stringify(payload) })
 *   Supabase:   supabase.from("bookings").insert(payload).select("id").single()
 */
export const localAdapter: BookingAdapter = async (payload) => {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
  const stamp = Date.parse(payload.submittedAt) || Date.now();
  return { success: true, bookingId: `PP-${stamp.toString(36).toUpperCase()}` };
};

export async function submitBooking(
  payload: BookingSubmission,
  adapter: BookingAdapter = localAdapter,
): Promise<SubmitResult> {
  try {
    return await adapter(payload);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return { success: false, error: message };
  }
}
