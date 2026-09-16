import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { renderWithProviders, screen, within } from "../test/render";
import { socialLinks } from "../config/socialLinks";
import Footer from "./Footer";

describe("Footer", () => {
  it("provides social links and a home anchor in a footer landmark", async () => {
    const { container } = renderWithProviders(<Footer />);
    const footer = screen.getByRole("contentinfo");
    for (const { label, href } of socialLinks) {
      expect(within(footer).getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href,
      );
    }
    expect(
      within(footer).getByRole("link", { name: "Back to top" }),
    ).toHaveAttribute("href", "#home");
    expect(footer).toHaveTextContent(`© ${new Date().getFullYear()} iDEA`);
    expect((await axe.run(container)).violations).toEqual([]);
  });
});
