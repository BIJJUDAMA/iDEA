import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const sections = [
  { name: "home" },
  { name: "about", button: "About" },
  { name: "team", button: "Team" },
  { name: "projects", button: "Projects" },
  { name: "contribute", button: "✱ Contribute" },
];

async function openSection(page, section) {
  await page.goto("/");
  if (section.button) {
    await page
      .getByRole("button", { name: section.button, exact: true })
      .click();
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
  await page.getByRole("button", { name: "Team", exact: true }).click();
  const advisors = page.getByRole("button", { name: /ADVISORS/ });
  await advisors.click();
  await expect(advisors).toHaveAttribute("aria-expanded", "true");

  await page.reload();
  await page.getByRole("button", { name: "Projects", exact: true }).click();
  await page.getByRole("button", { name: /Project Allocation System/ }).click();
  await expect(page.getByText("iDEA, CSE")).toBeVisible();
  const projectDescription = page.getByText(/Assigning student members/);
  await projectDescription.scrollIntoViewIfNeeded();
  await expect(projectDescription).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test("light and dark themes have no serious or critical accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  const lightResults = await new AxeBuilder({ page }).analyze();

  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  const darkResults = await new AxeBuilder({ page }).analyze();

  const highImpactViolations = [
    ...lightResults.violations,
    ...darkResults.violations,
  ].filter(({ impact }) => ["serious", "critical"].includes(impact));

  expect(highImpactViolations).toEqual([]);
});
