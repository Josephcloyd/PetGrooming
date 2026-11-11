import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { navLinks } from "@/data/navigation";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders the primary links and the booking CTA", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation", { name: /primary/i });
    for (const link of navLinks) {
      expect(nav).toContainElement(screen.getAllByRole("link", { name: link.label })[0]);
    }
    expect(screen.getAllByRole("link", { name: /book now/i })[0]).toHaveAttribute("href", "/booking");
  });

  it("opens and closes the mobile drawer", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const dialog = await screen.findByRole("dialog", { name: /menu/i });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close menu/i, expanded: true })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => expect(screen.queryByRole("dialog", { name: /menu/i })).not.toBeInTheDocument());
  });
});
