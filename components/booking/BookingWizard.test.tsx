import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { BookingAdapter } from "@/lib/booking/submit";
import { BookingWizard } from "./BookingWizard";

const searchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useSearchParams: () => searchParams,
}));

async function fillPetStep(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/pet's name/i), "Luna");
  await user.click(screen.getByLabelText(/^dog/i));
  await user.type(screen.getByLabelText(/^breed$/i), "Goldendoodle");
  await user.click(screen.getByLabelText(/^medium/i));
  await user.type(screen.getByLabelText(/age/i), "3");
  await user.click(screen.getByRole("button", { name: /continue/i }));
}

describe("BookingWizard", () => {
  beforeEach(() => {
    searchParams.delete("service");
  });

  it("starts on the pet step with an empty total", () => {
    render(<BookingWizard />);

    expect(screen.getByRole("heading", { name: /tell us about your pet/i })).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1");
    expect(screen.getByText(/pick a service to see your running total/i)).toBeInTheDocument();
  });

  it("blocks progress until the pet step is valid", async () => {
    const user = userEvent.setup();
    render(<BookingWizard />);

    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(await screen.findByText(/please enter your pet's name/i)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1");
  });

  it("advances to services and updates the running total", async () => {
    const user = userEvent.setup();
    render(<BookingWizard />);

    await fillPetStep(user);

    expect(await screen.findByRole("heading", { name: /choose your services/i })).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "2");

    await user.click(screen.getByLabelText(/bath & blow dry/i));

    const summary = screen.getByRole("complementary", { name: /luna's visit/i });
    // Medium-size bath: ₱350 x 1.25 rounded to ₱440. The line item and the rolling total both show it.
    expect(await within(summary).findAllByText("₱440")).toHaveLength(2);
  });

  it("preselects a service from the query string", async () => {
    searchParams.set("service", "spa-package");
    const user = userEvent.setup();
    render(<BookingWizard />);

    await fillPetStep(user);

    expect(await screen.findByLabelText(/spa package/i)).toBeChecked();
  });

  it("can go back to the previous step", async () => {
    const user = userEvent.setup();
    render(<BookingWizard />);

    await fillPetStep(user);
    await screen.findByRole("heading", { name: /choose your services/i });
    await user.click(screen.getByRole("button", { name: /back/i }));

    expect(await screen.findByRole("heading", { name: /tell us about your pet/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/pet's name/i)).toHaveValue("Luna");
  });

  it("submits through the adapter and shows the success screen", async () => {
    const user = userEvent.setup();
    const adapter: BookingAdapter = vi.fn().mockResolvedValue({ success: true, bookingId: "PP-TEST" });
    render(<BookingWizard adapter={adapter} />);

    await fillPetStep(user);
    await user.click(await screen.findByLabelText(/bath & blow dry/i));
    await user.click(screen.getByRole("button", { name: /continue/i }));

    await screen.findByRole("heading", { name: /pick a date and time/i });
    const dates = screen.getAllByRole("radio", { checked: false }).filter((el) => el.closest("[aria-labelledby='date-label']"));
    await user.click(dates[0]);
    await user.click(screen.getByRole("radio", { name: "10:00 AM" }));
    await user.click(screen.getByRole("button", { name: /continue/i }));

    await screen.findByRole("heading", { name: /how can we reach you/i });
    await user.type(screen.getByLabelText(/your name/i), "Jess Rivera");
    await user.type(screen.getByLabelText(/email/i), "jess@example.com");
    await user.type(screen.getByLabelText(/phone/i), "09123456789");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    await screen.findByRole("heading", { name: /review and confirm/i });
    await user.click(screen.getByRole("checkbox", { name: /vaccinations/i }));
    await user.click(screen.getByRole("button", { name: /confirm booking/i }));

    expect(await screen.findByRole("heading", { name: /luna is booked in/i })).toBeInTheDocument();
    expect(screen.getByText("PP-TEST")).toBeInTheDocument();
    expect(adapter).toHaveBeenCalledWith(
      expect.objectContaining({ petName: "Luna", serviceIds: ["bath-blow-dry"], total: 440, timeSlot: "10:00 AM" }),
    );
  });

  it("shows an error message when the adapter fails", async () => {
    const user = userEvent.setup();
    const adapter: BookingAdapter = vi.fn().mockResolvedValue({ success: false, error: "Server unavailable" });
    render(<BookingWizard adapter={adapter} />);

    await fillPetStep(user);
    await user.click(await screen.findByLabelText(/nail trimming/i));
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await screen.findByRole("heading", { name: /pick a date and time/i });
    const dates = screen.getAllByRole("radio", { checked: false }).filter((el) => el.closest("[aria-labelledby='date-label']"));
    await user.click(dates[1]);
    await user.click(screen.getByRole("radio", { name: "9:00 AM" }));
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await screen.findByRole("heading", { name: /how can we reach you/i });
    await user.type(screen.getByLabelText(/your name/i), "Jess");
    await user.type(screen.getByLabelText(/email/i), "jess@example.com");
    await user.type(screen.getByLabelText(/phone/i), "09123456789");
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await screen.findByRole("heading", { name: /review and confirm/i });
    await user.click(screen.getByRole("checkbox", { name: /vaccinations/i }));
    await user.click(screen.getByRole("button", { name: /confirm booking/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/server unavailable/i);
  });
});
