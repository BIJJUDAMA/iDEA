import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen } from "../../test/render";

vi.mock("@typeform/embed-react", () => ({
  PopupButton: ({ children, id }) => (
    <button type="button" data-form-id={id}>
      {children}
    </button>
  ),
}));
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
    await user.click(screen.getByRole("button", { name }));
    expect(Element.prototype.scrollIntoView).toHaveBeenLastCalledWith({
      block: "start",
      behavior: "smooth",
    });
    expect(Element.prototype.scrollIntoView.mock.instances.at(-1).id).toBe(id);
  });

  it("persists the accessible theme selection on the document root", async () => {
    const { user, unmount } = renderWithProviders(<LandingPage />);
    await user.click(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    );
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("idea-theme")).toBe("dark");
    unmount();
    renderWithProviders(<LandingPage />);
    expect(
      screen.getByRole("button", { name: "Switch to light theme" }),
    ).toBeInTheDocument();
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
