import { test, expect } from "@playwright/test";

test.describe("Finconnex Home Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://finconnex.vercel.app/", {
      waitUntil: "domcontentloaded",
    });

    // stabilize fonts + hydration
    await page.evaluate(() => document.fonts?.ready);

    await page.waitForTimeout(1200);
  });

  test("homepage loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Finconnex/i);
  });

  test("CTA button is clickable", async ({ page }) => {
    const button = page
      .locator("a, button")
      .filter({ hasText: /get started|start|login|signup|apply|contact/i })
      .first();

    await expect(button).toBeVisible();

    await button.click();

    await page.waitForTimeout(1000);
  });
});
