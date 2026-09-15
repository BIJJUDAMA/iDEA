import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const sections = [
  { name: "home" },
  { name: "about", button: "About" },
  { name: "team", button: "Team" },
  { name: "projects", button: "Projects" },
  { name: "contribute", button: "Contribute" },
];

async function openSection(page, section) {
  await page.goto("/");
  if (section.button) {
    await page.getByRole("button", { name: section.button }).click();
  }
  await page.waitForTimeout(500);
}

for (const section of sections) {
  test(`${section.name} matches the visual baseline`, async ({
    page,
  }, testInfo) => {
    await openSection(page, section);

    await expect(page).toHaveScreenshot(
      `${testInfo.project.name}-${section.name}.png`,
    );
  });
}

test("primary navigation, theme, Team, and Projects interactions work", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "iDEA", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "GitHub", exact: true }),
  ).toHaveAttribute("href", "https://github.com/IDEA-Amrita");

  await page.locator("svg").first().click();
  await expect(page.locator(".dark")).toBeVisible();

  await page.reload();
  await page.getByRole("button", { name: "Team" }).click();
  const advisors = page.getByRole("button", { name: /ADVISORS/ });
  await advisors.click();
  await expect(advisors).toHaveAttribute("aria-expanded", "true");

  await page.reload();
  await page.getByRole("button", { name: "Projects" }).click();
  await page.getByRole("button", { name: /Project Allocation System/ }).click();
  await expect(page.getByText("iDEA, CSE")).toBeVisible();
});

test("home has no serious or critical accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  // Color contrast failures are part of the accepted Phase 0 baseline.
  const results = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .analyze();
  const highImpactViolations = results.violations.filter(({ impact }) =>
    ["serious", "critical"].includes(impact),
  );

  expect(highImpactViolations).toEqual([]);
});
