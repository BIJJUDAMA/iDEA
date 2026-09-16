import { describe, expect, it } from "vitest";
import { renderWithProviders, screen, within } from "../../../test/render";
import Team from "./TeamSection";
import faculty from "../../../data/faculty";
import { teamGroups } from "../../../data/team";

describe("Team", () => {
  it("renders the placeholder roster and opens and closes role panels", async () => {
    const { user, container } = renderWithProviders(
      <Team onNavigate={() => {}} />,
    );
    expect(faculty).toHaveLength(1);
    expect(
      teamGroups.map((group) => [group.label, group.members.length]),
    ).toEqual([
      ["PRESIDENT", 1],
      ["VICE PRESIDENTS", 2],
      ["R&D & PR HEADS", 2],
      ["SECRETARY, TREASURER & JOINT SECRETARY", 3],
      ["TECH LEAD & WEB MASTER", 2],
    ]);
    expect(container.querySelector("img")).toBeNull();
    const vicePresidents = screen.getByRole("button", {
      name: "VICE PRESIDENTS",
    });
    expect(vicePresidents).toHaveAttribute("aria-expanded", "false");
    await user.click(vicePresidents);
    const panel = document.getElementById(
      vicePresidents.getAttribute("aria-controls"),
    );
    expect(vicePresidents).toHaveAttribute("aria-expanded", "true");
    expect(panel.firstElementChild).not.toHaveAttribute("inert");
    expect(within(panel).getAllByText("To be announced")).toHaveLength(2);
    await user.click(vicePresidents);
    expect(vicePresidents).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("aria-hidden", "true");
    expect(panel.firstElementChild).toHaveAttribute("inert");
  });
});
