import { describe, expect, it, vi } from "vitest";
import { localAdapter, submitBooking, type BookingSubmission } from "./submit";

const payload: BookingSubmission = {
  petName: "Luna",
  petType: "dog",
  breed: "Poodle",
  size: "small",
  age: 2,
  serviceIds: ["bath-blow-dry"],
  location: "salon",
  date: "2026-12-01",
  timeSlot: "9:00 AM",
  ownerName: "Jess",
  email: "jess@example.com",
  phone: "09123456789",
  notes: "",
  agreePolicy: true,
  total: 35,
  submittedAt: "2026-11-11T10:00:00.000Z",
};

describe("submitBooking", () => {
  it("delegates to the adapter and returns its result", async () => {
    const adapter = vi.fn().mockResolvedValue({ success: true, bookingId: "PP-1" });

    const result = await submitBooking(payload, adapter);

    expect(adapter).toHaveBeenCalledWith(payload);
    expect(result).toEqual({ success: true, bookingId: "PP-1" });
  });

  it("converts thrown errors into a failed result", async () => {
    const adapter = vi.fn().mockRejectedValue(new Error("network down"));

    const result = await submitBooking(payload, adapter);

    expect(result).toEqual({ success: false, error: "network down" });
  });

  it("uses a generic message for non-Error throws", async () => {
    const adapter = vi.fn().mockRejectedValue("boom");

    const result = await submitBooking(payload, adapter);

    expect(result).toEqual({ success: false, error: "Something went wrong" });
  });

  it("local adapter produces a deterministic reference from submittedAt", async () => {
    vi.useFakeTimers();
    const pending = localAdapter(payload);
    await vi.runAllTimersAsync();
    const result = await pending;
    vi.useRealTimers();

    expect(result.success).toBe(true);
    if (result.success) expect(result.bookingId).toMatch(/^PP-[0-9A-Z]+$/);
  });
});
