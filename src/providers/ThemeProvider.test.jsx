import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen } from "../test/render";
import { useTheme } from "./themeContext";

function PreferenceControl() {
  const { preference, theme, setPreference } = useTheme();
  return (
    <>
      <p>
        {preference}: {theme}
      </p>
      <button onClick={() => setPreference("system")}>Use system theme</button>
      <button onClick={() => setPreference("dark")}>Use dark theme</button>
    </>
  );
}
afterEach(() => {
  vi.restoreAllMocks();
});

describe("theme preferences", () => {
  it("can restore system behavior after an explicit preference", async () => {
    localStorage.setItem("idea-theme", "dark");
    const { user } = renderWithProviders(<PreferenceControl />);
    expect(screen.getByText("dark: dark")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Use system theme" }));
    expect(screen.getByText("system: light")).toBeInTheDocument();
    expect(localStorage.getItem("idea-theme")).toBe("system");
  });

  it("works when browser storage is blocked", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const { user } = renderWithProviders(<PreferenceControl />);
    await user.click(screen.getByRole("button", { name: "Use dark theme" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
