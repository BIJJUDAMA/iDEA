import { forwardRef, useImperativeHandle } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen, within } from "../../test/render";

const { scrollTo } = vi.hoisted(() => ({ scrollTo: vi.fn() }));

vi.mock("@react-spring/parallax", () => ({
  Parallax: forwardRef(function ParallaxMock(
    { children, className, ...props },
    ref,
  ) {
    useImperativeHandle(ref, () => ({ scrollTo }));
    return (
      <main className={className} data-testid="parallax" {...props}>
        {children}
      </main>
    );
  }),
  ParallaxLayer: ({ children }) => <section>{children}</section>,
}));

vi.mock("@typeform/embed-react", () => ({
  PopupButton: ({ children, id }) => (
    <button type="button" data-form-id={id}>
      {children}
    </button>
  ),
}));

import LandingPage from "./LandingPage";

describe("landing page", () => {
  beforeEach(() => {
    scrollTo.mockClear();
  });

  it("renders the wordmark, primary navigation, and intended GitHub URL", () => {
    renderWithProviders(<LandingPage />);

    expect(screen.getByRole("heading", { name: "iDEA" })).toBeVisible();
    expect(screen.getByRole("button", { name: "About" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Team" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Projects" })).toBeVisible();
    expect(screen.getByRole("button", { name: "✱ Contribute" })).toBeVisible();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/IDEA-Amrita",
    );
  });

  it.each([
    ["About", 1],
    ["Team", 2],
    ["Projects", 3],
    ["✱ Contribute", 4],
  ])("moves %s to its active section", async (name, page) => {
    const { user } = renderWithProviders(<LandingPage />);

    await user.click(screen.getByRole("button", { name }));

    expect(scrollTo).toHaveBeenCalledWith(page);
  });

  it("changes the page theme", async () => {
    const { container, user } = renderWithProviders(<LandingPage />);
    const parallax = screen.getByTestId("parallax");
    const themeControl = container.querySelector("section svg");

    expect(parallax).toHaveClass("light");
    expect(themeControl).not.toBeNull();

    await user.click(themeControl);

    expect(parallax).toHaveClass("dark");
  });

  it("uses labeled timeline controls to move between sections", async () => {
    const { container, user } = renderWithProviders(<LandingPage />);
    const aboutSection = container.querySelectorAll("section")[1];

    expect(
      within(aboutSection).getByLabelText("About, current section"),
    ).toHaveAttribute("aria-current", "page");

    await user.click(
      within(aboutSection).getByRole("button", {
        name: "Navigate to Home",
      }),
    );

    expect(scrollTo).toHaveBeenCalledWith(0);
  });
});
