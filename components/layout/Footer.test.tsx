import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { footerLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders quick links, social links and the copyright", () => {
    render(<Footer />);

    const nav = screen.getByRole("navigation", { name: /footer/i });
    for (const link of footerLinks) {
      expect(nav).toContainElement(screen.getByRole("link", { name: link.label }));
    }
    for (const social of site.social) {
      expect(screen.getByRole("link", { name: social.name })).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} ${site.legalName}`))).toBeInTheDocument();
  });

  it("rejects an invalid newsletter email and confirms a valid one", async () => {
    const user = userEvent.setup();
    render(<Footer />);

    const input = screen.getByRole("textbox", { name: /grooming tips/i });
    await user.type(input, "not-an-email");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/valid email/i);

    await user.clear(input);
    await user.type(input, "jess@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(await screen.findByRole("status")).toHaveTextContent(/on the list/i);
  });
});
