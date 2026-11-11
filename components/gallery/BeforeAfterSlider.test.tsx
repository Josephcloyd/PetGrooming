import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { beforeAfterPairs } from "@/data/gallery";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

describe("BeforeAfterSlider", () => {
  it("starts centred and moves with the keyboard", async () => {
    const user = userEvent.setup();
    render(<BeforeAfterSlider pair={beforeAfterPairs[0]} />);

    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "50");

    slider.focus();
    await user.keyboard("{ArrowRight}{ArrowRight}");
    expect(slider).toHaveAttribute("aria-valuenow", "54");

    await user.keyboard("{Shift>}{ArrowLeft}{/Shift}");
    expect(slider).toHaveAttribute("aria-valuenow", "44");

    await user.keyboard("{End}");
    expect(slider).toHaveAttribute("aria-valuenow", "100");

    await user.keyboard("{Home}");
    expect(slider).toHaveAttribute("aria-valuenow", "0");
  });
});
