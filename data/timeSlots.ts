export const timeSlots: string[] = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export type BookingLocation = "salon" | "home";

export const locationOptions: { value: BookingLocation; label: string; hint: string }[] = [
  { value: "salon", label: "Drop off at the studio", hint: "Free parking right outside" },
  { value: "home", label: "Home service", hint: "Our van comes to you" },
];
