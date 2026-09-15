import { forwardRef, useImperativeHandle } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen } from "../test/render";

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

import Landing from "./Landing";

describe("landing page", () => {
  beforeEach(() => {
    scrollTo.mockClear();
  });

  it("renders the wordmark, primary navigation, and intended GitHub URL", () => {
    renderWithProviders(<Landing />);

    expect(screen.getByRole("heading", { name: "iDEA" })).toBeVisible();
    expect(screen.getByRole("button", { name: "About" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Team" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Projects" })).toBeVisible();
    expect(screen.getByRole("button", { name: /Contribute/ })).toBeVisible();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/IDEA-Amrita",
    );
  });

  it.each([
    ["About", 1],
    ["Team", 2],
    ["Projects", 3],
    [/Contribute/, 4],
  ])("moves %s to its active section", async (name, page) => {
    const { user } = renderWithProviders(<Landing />);

    await user.click(screen.getByRole("button", { name }));

    expect(scrollTo).toHaveBeenCalledWith(page);
  });

  it("changes the page theme", async () => {
    const { container, user } = renderWithProviders(<Landing />);
    const parallax = screen.getByTestId("parallax");
    const themeControl = container.querySelector("section svg");

    expect(parallax).toHaveClass("light");
    expect(themeControl).not.toBeNull();

    await user.click(themeControl);

    expect(parallax).toHaveClass("dark");
  });
});
