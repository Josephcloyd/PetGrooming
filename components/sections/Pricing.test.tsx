import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { packages } from "@/data/pricing";
import { formatPrice } from "@/lib/utils";
import { Pricing } from "./Pricing";

describe("Pricing", () => {
  it("defaults to medium pricing and highlights the popular package", () => {
    render(<Pricing />);

    expect(screen.getByRole("radio", { name: /medium/i })).toBeChecked();
    const popular = packages.find((pkg) => pkg.popular)!;
    const card = screen.getByTestId(`pricing-card-${popular.id}`);
    expect(within(card).getByText(/most popular/i)).toBeInTheDocument();
    expect(within(card).getByText(formatPrice(popular.prices.medium))).toBeInTheDocument();
  });

  it("updates every package price when the size changes", async () => {
    const user = userEvent.setup();
    render(<Pricing />);

    await user.click(screen.getByRole("radio", { name: /large/i }));

    expect(screen.getByRole("radio", { name: /large/i })).toBeChecked();
    for (const pkg of packages) {
      const card = screen.getByTestId(`pricing-card-${pkg.id}`);
      expect(within(card).getByText(formatPrice(pkg.prices.large))).toBeInTheDocument();
      expect(within(card).getByText(/\/ large pet/)).toBeInTheDocument();
    }
  });
});
