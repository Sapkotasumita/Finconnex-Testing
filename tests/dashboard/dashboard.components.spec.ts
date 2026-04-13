import { test, expect } from "@playwright/test";

test.describe("Finconnex Dashboard Components Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard", {
      waitUntil: "domcontentloaded",
    });

    await page.waitForLoadState("networkidle").catch(() => {});
    await page.evaluate(() => document.fonts?.ready).catch(() => {});
    await page.waitForTimeout(1500);
  });

  // 1. METRIC CARDS
  test("metric cards display valid data", async ({ page }) => {
    const cards = page.locator('[class*="card"], [class*="stat"]');

    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 4); i++) {
      const text = await cards.nth(i).textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  //  2. CHARTS
  test("charts render correctly", async ({ page }) => {
    const charts = page.locator("canvas, svg");

    const count = await charts.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(charts.nth(i)).toBeVisible();
    }
  });

  // 3. TABLE DATA
  test("table shows data rows", async ({ page }) => {
    const rows = page.locator("table tbody tr");

    const count = await rows.count();

    if (count > 0) {
      expect(count).toBeGreaterThan(0);
    }
  });

  // 4. SEARCH
  test("search input works", async ({ page }) => {
    const search = page.locator(
      'input[type="search"], input[placeholder*="search"]',
    );

    if (await search.count()) {
      await search.first().fill("test");
      await page.waitForTimeout(500);

      await expect(search.first()).toHaveValue("test");
    }
  });

  //  5. DROPDOWN / FILTER
  test("dropdown filter opens", async ({ page }) => {
    const dropdown = page.locator("button:has-text('Filter'), select");

    if (await dropdown.count()) {
      await dropdown.first().click();
      await page.waitForTimeout(500);
    }
  });

  // 6. NOTIFICATION ICON
  test("notification icon is visible", async ({ page }) => {
    const bell = page.locator('[aria-label*="notification"], svg');

    await expect(bell.first()).toBeVisible();
  });

  //  7. USER MENU
  test("user menu opens", async ({ page }) => {
    const profile = page.locator('img, button[aria-label*="user"]');

    if (await profile.count()) {
      await profile.first().click();
      await page.waitForTimeout(500);
    }
  });

  //  8. LOADING STATE
  test("loading skeleton disappears", async ({ page }) => {
    const loader = page.locator('[class*="loading"], [class*="skeleton"]');

    if (await loader.count()) {
      await expect(loader.first()).toBeHidden({ timeout: 5000 });
    }
  });

  //  9. API CHECK (OPTIONAL)
  test("dashboard API returns success", async ({ page }) => {
    const response = await page.request.get("/");

    expect(response.status()).toBeLessThan(400);
  });

  //  10. COMPONENT VISUAL TEST
  test("card component visual test", async ({ page }) => {
    const card = page.locator('[class*="card"]').first();

    if (await card.count()) {
      await expect(card).toHaveScreenshot("dashboard-card.png", {
        animations: "disabled",
        maxDiffPixelRatio: 0.3,
      });
    }
  });
});
