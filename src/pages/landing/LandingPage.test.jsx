import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen, within } from "../../test/render";

import LandingPage from "./LandingPage";

const destinations = ["home", "about", "team", "projects", "contribute"];
describe("landing page", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView.mockClear();
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      function () {
        return { top: Math.max(0, destinations.indexOf(this.id)) * 1000 };
      },
    );
  });

  it("renders document sections and the intended GitHub URL", () => {
    const { container } = renderWithProviders(<LandingPage />);
    expect(screen.getByRole("heading", { name: "iDEA" })).toBeVisible();
    for (const id of destinations)
      expect(container.querySelector(`section#${id}`)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/IDEA-Amrita",
    );
  });

  it.each([
    ["About", "about"],
    ["Team", "team"],
    ["Projects", "projects"],
    ["✱ Contribute", "contribute"],
  ])("scrolls %s to its document section", async (name, id) => {
    const { user } = renderWithProviders(<LandingPage />);
    await user.click(
      within(
        screen.getByRole("navigation", { name: "Primary navigation" }),
      ).getByRole("link", { name }),
    );
    expect(Element.prototype.scrollIntoView).toHaveBeenLastCalledWith({
      block: "start",
      behavior: "smooth",
    });
    expect(Element.prototype.scrollIntoView.mock.instances.at(-1).id).toBe(id);
  });

  it("persists the accessible theme selection on the document root", async () => {
    const { user, unmount } = renderWithProviders(<LandingPage />);
    const toggle = screen.getByRole("button", { name: "Switch to dark theme" });
    expect(document.getElementById("home")).not.toContainElement(toggle);
    await user.click(toggle);
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("idea-theme")).toBe("dark");
    unmount();
    renderWithProviders(<LandingPage />);
    expect(
      screen.getByRole("button", { name: "Switch to light theme" }),
    ).toBeInTheDocument();
  });

  it("restores the home anchor when returning from the footer", async () => {
    const { user } = renderWithProviders(<LandingPage />);
    window.history.replaceState(null, "", "#contribute");
    await user.click(screen.getByRole("link", { name: "Back to top" }));
    expect(window.location.hash).toBe("#home");
    expect(Element.prototype.scrollIntoView.mock.instances.at(-1).id).toBe(
      "home",
    );
    expect(Element.prototype.scrollIntoView).toHaveBeenLastCalledWith({
      block: "start",
      behavior: "instant",
    });
  });

  it("restores a bookmarked fragment with immediate scrolling", () => {
    window.history.replaceState(null, "", "#projects");
    renderWithProviders(<LandingPage />);
    expect(Element.prototype.scrollIntoView.mock.instances[0].id).toBe(
      "projects",
    );
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      block: "start",
      behavior: "instant",
    });
  });
});
