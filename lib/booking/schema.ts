import { z } from "zod";

export const PET_TYPES = ["dog", "cat"] as const;
export const PET_SIZES = ["small", "medium", "large"] as const;
export const LOCATIONS = ["salon", "home"] as const;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const PHONE = /^\+?[\d\s().-]{7,20}$/;

export const petInfoSchema = z.object({
  petName: z.string().trim().min(2, "Please enter your pet's name").max(40, "Keep the name under 40 characters"),
  petType: z.enum(PET_TYPES, { error: "Choose dog or cat" }),
  breed: z.string().trim().min(2, "Tell us the breed, or 'mixed'").max(60, "Keep the breed under 60 characters"),
  size: z.enum(PET_SIZES, { error: "Pick a size" }),
  age: z
    .number({ error: "Enter your pet's age in years" })
    .min(0, "Age can't be negative")
    .max(30, "Please double-check the age"),
});

export const servicesSchema = z.object({
  serviceIds: z.array(z.string()).min(1, "Pick at least one service"),
});

export const scheduleSchema = z.object({
  location: z.enum(LOCATIONS, { error: "Choose studio or home service" }),
  date: z.string().regex(ISO_DATE, "Pick a date"),
  timeSlot: z.string().min(1, "Pick a time slot"),
});

export const contactSchema = z.object({
  ownerName: z.string().trim().min(2, "Please enter your name").max(60, "Keep the name under 60 characters"),
  email: z.email("Enter a valid email address"),
  phone: z.string().trim().regex(PHONE, "Enter a valid phone number"),
  notes: z.string().trim().max(500, "Notes must be under 500 characters"),
});

export const reviewSchema = z.object({
  agreePolicy: z.boolean().refine((value) => value === true, {
    message: "Please accept the grooming policy to continue",
  }),
});

export const bookingSchema = petInfoSchema
  .extend(servicesSchema.shape)
  .extend(scheduleSchema.shape)
  .extend(contactSchema.shape)
  .extend(reviewSchema.shape);

export type BookingFormValues = z.infer<typeof bookingSchema>;
export type BookingField = keyof BookingFormValues;

/** Age starts empty so the number input renders blank rather than "NaN". */
export type BookingDefaults = Omit<BookingFormValues, "age"> & { age?: number };

export const bookingDefaults: BookingDefaults = {
  petName: "",
  petType: "dog",
  breed: "",
  size: "small",
  serviceIds: [],
  location: "salon",
  date: "",
  timeSlot: "",
  ownerName: "",
  email: "",
  phone: "",
  notes: "",
  agreePolicy: false,
};

/** Fields validated before the user may leave each step. */
export const stepFields: BookingField[][] = [
  ["petName", "petType", "breed", "size", "age"],
  ["serviceIds"],
  ["location", "date", "timeSlot"],
  ["ownerName", "email", "phone", "notes"],
  ["agreePolicy"],
];
