import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen } from "../../test/render";

vi.mock("@typeform/embed-react", () => ({
  PopupButton: ({ children, id }) => (
    <button type="button" data-form-id={id}>
      {children}
    </button>
  ),
}));

import Contribute from "./ContributeSection";

describe("Contribute", () => {
  it("gives both contribution actions accessible names", async () => {
    const { container } = renderWithProviders(<Contribute isLight />);
    const actions = screen.getAllByRole("button", { name: /lessgo/i });

    expect(actions).toHaveLength(2);
    expect(actions[0]).toHaveAttribute("data-form-id", "Csq4ijcx");
    expect(actions[1]).toHaveAttribute("data-form-id", "KS9VXRHf");

    const results = await axe.run(container);
    const highImpactViolations = results.violations.filter(({ impact }) =>
      ["serious", "critical"].includes(impact),
    );

    expect(highImpactViolations).toEqual([]);
  });
});
