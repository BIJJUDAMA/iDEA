import { describe, expect, it } from "vitest";
import { renderWithProviders, screen, within } from "../../../test/render";

import Projects from "./ProjectsSection";

describe("Projects", () => {
  it("updates details and contact actions for the selected project", async () => {
    const { container, user } = renderWithProviders(
      <Projects onNavigate={() => {}} />,
    );

    expect(screen.getByText(/Nirmal K, 4th Year CSE/)).toBeInTheDocument();
    const scheduler = screen.getByRole("button", { name: "Scheduler" });
    expect(scheduler).toHaveAttribute("aria-expanded", "true");

    await user.click(
      screen.getByRole("button", { name: "Show project contact options" }),
    );
    expect(
      container.querySelector(".project-contact-links"),
    ).toBeInTheDocument();

    const allocation = screen.getByRole("button", {
      name: "Project Allocation System",
    });
    await user.click(allocation);

    expect(screen.getByText("iDEA, CSE")).toBeInTheDocument();
    expect(allocation).toHaveAttribute("aria-expanded", "true");
    expect(scheduler).toHaveAttribute("aria-expanded", "false");
    expect(container.querySelector(".project-contact-links")).toBeNull();

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
    await user.click(allocation);
    expect(allocation).toHaveAttribute("aria-expanded", "false");
    const panel = document.getElementById(
      allocation.getAttribute("aria-controls"),
    );
    expect(panel).toHaveAttribute("aria-hidden", "true");
    expect(panel.firstElementChild).toHaveAttribute("inert");
    expect(container.querySelector(".project-contact-links")).toBeNull();
    await user.click(allocation);
    expect(allocation).toHaveAttribute("aria-expanded", "true");
    expect(container.querySelector(".project-contact-links")).toBeNull();
  });
});
