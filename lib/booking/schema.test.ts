import { describe, expect, it } from "vitest";
import {
  bookingDefaults,
  bookingSchema,
  contactSchema,
  petInfoSchema,
  reviewSchema,
  scheduleSchema,
  servicesSchema,
  stepFields,
  type BookingFormValues,
} from "./schema";

const validBooking: BookingFormValues = {
  petName: "Luna",
  petType: "dog",
  breed: "Goldendoodle",
  size: "medium",
  age: 3,
  serviceIds: ["bath-blow-dry"],
  location: "salon",
  date: "2026-12-01",
  timeSlot: "10:00 AM",
  ownerName: "Jess Rivera",
  email: "jess@example.com",
  phone: "0912 345 6789",
  notes: "",
  agreePolicy: true,
};

describe("petInfoSchema", () => {
  it("accepts a complete pet profile", () => {
    expect(petInfoSchema.safeParse(validBooking).success).toBe(true);
  });

  it("rejects a NaN age with the friendly message", () => {
    const result = petInfoSchema.safeParse({ ...validBooking, age: Number.NaN });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Enter your pet's age in years");
  });

  it("rejects a one-letter name", () => {
    expect(petInfoSchema.safeParse({ ...validBooking, petName: "L" }).success).toBe(false);
  });
});

describe("servicesSchema", () => {
  it("requires at least one service", () => {
    expect(servicesSchema.safeParse({ serviceIds: [] }).success).toBe(false);
    expect(servicesSchema.safeParse({ serviceIds: ["x"] }).success).toBe(true);
  });
});

describe("scheduleSchema", () => {
  it("requires an ISO date and a slot", () => {
    expect(scheduleSchema.safeParse({ location: "home", date: "Dec 1", timeSlot: "9:00 AM" }).success).toBe(false);
    expect(scheduleSchema.safeParse({ location: "home", date: "2026-12-01", timeSlot: "" }).success).toBe(false);
    expect(scheduleSchema.safeParse({ location: "home", date: "2026-12-01", timeSlot: "9:00 AM" }).success).toBe(true);
  });
});

describe("contactSchema", () => {
  it("validates email and phone formats", () => {
    expect(contactSchema.safeParse({ ...validBooking, email: "not-an-email" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...validBooking, phone: "12" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...validBooking, phone: "+63 912 345 6789" }).success).toBe(true);
    expect(contactSchema.safeParse({ ...validBooking, phone: "09123456789" }).success).toBe(true);
  });

  it("caps notes at 500 characters", () => {
    expect(contactSchema.safeParse({ ...validBooking, notes: "x".repeat(501) }).success).toBe(false);
  });
});

describe("reviewSchema", () => {
  it("requires the policy checkbox", () => {
    expect(reviewSchema.safeParse({ agreePolicy: false }).success).toBe(false);
    expect(reviewSchema.safeParse({ agreePolicy: true }).success).toBe(true);
  });
});

describe("bookingSchema", () => {
  it("accepts the full valid booking", () => {
    expect(bookingSchema.safeParse(validBooking).success).toBe(true);
  });

  it("rejects the untouched defaults", () => {
    expect(bookingSchema.safeParse(bookingDefaults).success).toBe(false);
  });

  it("covers every schema key exactly once across steps", () => {
    const flattened = stepFields.flat().sort();
    const keys = Object.keys(bookingSchema.shape).sort();
    expect(flattened).toEqual(keys);
  });
});
