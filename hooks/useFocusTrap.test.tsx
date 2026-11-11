import { useRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { useFocusTrap } from "./useFocusTrap";

function Trap({ active, onClose }: { active: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, active, onClose);
  return (
    <div>
      <button type="button">outside</button>
      <div ref={ref}>
        <button type="button">first</button>
        <button type="button">last</button>
      </div>
    </div>
  );
}

describe("useFocusTrap", () => {
  it("focuses the first element and cycles with Tab and Shift+Tab", async () => {
    const user = userEvent.setup();
    render(<Trap active onClose={() => {}} />);

    expect(screen.getByRole("button", { name: "first" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "last" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "first" })).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "last" })).toHaveFocus();
  });

  it("calls onClose on Escape and restores focus when deactivated", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { rerender } = render(<Trap active={false} onClose={onClose} />);
    screen.getByRole("button", { name: "outside" }).focus();

    rerender(<Trap active onClose={onClose} />);
    expect(screen.getByRole("button", { name: "first" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(<Trap active={false} onClose={onClose} />);
    expect(screen.getByRole("button", { name: "outside" })).toHaveFocus();
  });
});
