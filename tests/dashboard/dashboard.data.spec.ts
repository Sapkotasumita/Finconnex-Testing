import { test, expect } from "@playwright/test";

test.describe("Dashboard Data Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard", {
      waitUntil: "domcontentloaded",
    });

    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(1500);
  });

  //  Check numeric data exists
  test("dashboard shows numeric values", async ({ page }) => {
    const numbers = page.locator("text=/\\d+/");

    const count = await numbers.count();

    expect(count).toBeGreaterThan(0);
  });

  //  Cards contain actual data
  test("cards contain valid content", async ({ page }) => {
    const cards = page.locator('[class*="card"], [class*="stat"]');

    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const text = await cards.nth(i).textContent();

      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  //  Table has rows (if exists)
  test("table contains rows if present", async ({ page }) => {
    const table = page.locator("table");

    if (await table.count()) {
      const rows = table.locator("tbody tr");
      const count = await rows.count();

      expect(count).toBeGreaterThan(0);
    }
  });

  // No empty dashboard state
  test("dashboard is not empty", async ({ page }) => {
    const bodyText = await page.locator("body").textContent();

    expect(bodyText?.trim().length).toBeGreaterThan(50);
  });
});
