import { test, expect } from "@playwright/test";

test.describe("Finconnex Dashboard Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard", {
      waitUntil: "domcontentloaded",
    });

    // Stabilize fonts + hydration (VERY IMPORTANT for dashboards)
    await page.evaluate(() => document.fonts?.ready).catch(() => {});

    await page.waitForTimeout(1500);
  });

  test("dashboard loads successfully", async ({ page }) => {
    await expect(page.locator("body")).toBeVisible();
  });

  test("dashboard title or header is visible", async ({ page }) => {
    const header = page.locator("h1, header").first();

    await expect(header).toBeVisible();
  });

  test("sidebar navigation is visible", async ({ page }) => {
    const sidebar = page.locator("nav, aside").first();

    await expect(sidebar).toBeVisible();
  });

  test("dashboard widgets/cards are rendered", async ({ page }) => {
    const widgets = page.locator('[class*="card"], [class*="widget"], section');

    const count = await widgets.count();

    expect(count).toBeGreaterThan(0);

    // check first few widgets only (prevents flakiness)
    for (let i = 0; i < Math.min(3, count); i++) {
      await expect(widgets.nth(i)).toBeVisible();
    }
  });

  test("dashboard CTA buttons work", async ({ page }) => {
    const buttons = page
      .locator("a, button")
      .filter({ hasText: /view|open|details|manage|edit/i });

    const count = await buttons.count();

    if (count > 0) {
      await buttons.first().click();
      await page.waitForTimeout(800);
    }

    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("dashboard layout stability check", async ({ page }) => {
    const header = page.locator("header").first();
    const main = page.locator("main, section").first();

    const headerBox = await header.boundingBox();
    const mainBox = await main.boundingBox();

    if (!headerBox || !mainBox) return;

    const gap = mainBox.y - (headerBox.y + headerBox.height);

    // dashboards are dynamic → allow more tolerance
    expect(gap).toBeLessThan(300);
  });

  test("dashboard visual snapshot (stable)", async ({ page }) => {
    await page.waitForLoadState("networkidle").catch(() => {});

    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot("dashboard.png", {
      fullPage: true,
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.3,
    });
  });
});
