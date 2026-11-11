import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { faqs } from "@/data/faqs";
import { Faq } from "./Faq";

describe("Faq", () => {
  it("renders every question with the first one open", () => {
    render(<Faq />);

    const buttons = screen.getAllByRole("button", { expanded: true });
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveTextContent(faqs[0].question);
    expect(screen.getByText(faqs[0].answer)).toBeInTheDocument();
  });

  it("opens another answer and closes the previous one", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    await user.click(screen.getByRole("button", { name: faqs[1].question }));

    expect(screen.getByRole("button", { name: faqs[1].question })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: faqs[0].question })).toHaveAttribute("aria-expanded", "false");
    expect(await screen.findByText(faqs[1].answer)).toBeInTheDocument();
  });

  it("collapses an open answer when clicked again", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    await user.click(screen.getByRole("button", { name: faqs[0].question }));

    expect(screen.getByRole("button", { name: faqs[0].question })).toHaveAttribute("aria-expanded", "false");
  });
});
