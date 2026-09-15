import { describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen, within } from "../test/render";

vi.mock("@typeform/embed-react", () => ({
  PopupButton: ({ children, id }) => (
    <button type="button" data-form-id={id}>
      {children}
    </button>
  ),
}));

import Projects from "./projects";

describe("Projects", () => {
  it("updates details and contact actions for the selected project", async () => {
    const { container, user } = renderWithProviders(<Projects isLight />);

    expect(screen.getByText(/Nirmal K, 4th Year CSE/)).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Project Allocation System/ }),
    );

    expect(screen.getByText("iDEA, CSE")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Show project contact options" }),
    );

    const contactActions = within(
      container.querySelector(".project-contact-links"),
    );

    expect(
      contactActions.getByRole("link", { name: "Email iDEA" }),
    ).toHaveAttribute("href", "mailto:ideatech@cb.amrita.edu");
    expect(
      contactActions.getByRole("link", { name: "iDEA on Instagram" }),
    ).toHaveAttribute("href", "https://www.instagram.com/idea_amrita/");
  });
});
