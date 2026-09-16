import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen, waitFor } from "../test/render";
import TypeformButton from "./TypeformButton";

const { createWidget, unmountWidget } = vi.hoisted(() => ({
  createWidget: vi.fn(),
  unmountWidget: vi.fn(),
}));
vi.mock("../utils/loadTypeform", () => ({ createWidget }));
beforeEach(() => {
  createWidget.mockReset().mockReturnValue({ unmount: unmountWidget });
  unmountWidget.mockClear();
});
describe("form resilience", () => {
  it("loads only on interaction and restores focus after closing", async () => {
    const { user } = renderWithProviders(
      <TypeformButton formId="Csq4ijcx" label="Propose a project">
        lessgo
      </TypeformButton>,
    );
    expect(createWidget).not.toHaveBeenCalled();
    const trigger = screen.getByRole("button", { name: "Propose a project" });
    await user.click(trigger);
    await waitFor(() => expect(createWidget).toHaveBeenCalledOnce());
    expect(
      screen.getByRole("dialog", { name: "Propose a project" }),
    ).toBeVisible();
    await user.click(
      screen.getByRole("button", { name: "Close Propose a project form" }),
    );
    expect(trigger).toHaveFocus();
    expect(unmountWidget).toHaveBeenCalledOnce();
  });
  it("offers the correct direct link when embedding fails", async () => {
    createWidget.mockImplementation(() => {
      throw new Error("failed");
    });
    const { user } = renderWithProviders(
      <TypeformButton formId="KS9VXRHf" label="Join iDEA">
        Join
      </TypeformButton>,
    );
    await user.click(screen.getByRole("button", { name: "Join iDEA" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("could not load"),
    );
    expect(
      screen.getByRole("link", { name: /Open Join iDEA form directly/ }),
    ).toHaveAttribute("href", "https://form.typeform.com/to/KS9VXRHf");
  });
});
