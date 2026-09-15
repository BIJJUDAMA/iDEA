import { describe, expect, it } from "vitest";
import { renderWithProviders, screen } from "../test/render";
import Team from "./team";

describe("Team", () => {
  it("opens and closes an accordion panel", async () => {
    const { user } = renderWithProviders(<Team isLight />);
    const advisors = screen.getByRole("button", { name: /ADVISORS/ });

    expect(advisors).toHaveAttribute("aria-expanded", "false");

    await user.click(advisors);
    expect(advisors).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Nirmal K")).toBeInTheDocument();

    await user.click(advisors);
    expect(advisors).toHaveAttribute("aria-expanded", "false");
  });
});
