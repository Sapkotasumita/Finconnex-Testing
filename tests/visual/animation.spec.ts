import { test, expect } from "@playwright/test";

test.describe("Finconnex UI Animations (Stable Mode)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://finconnex.vercel.app/", {
      waitUntil: "domcontentloaded",
    });

    await page.evaluate(() => document.fonts?.ready);
    await page.waitForTimeout(1200);
  });

  test("hero section renders correctly", async ({ page }) => {
    const hero = page.locator("section").first();

    await hero.scrollIntoViewIfNeeded();
    await expect(hero).toBeVisible();

    await expect(hero).toHaveScreenshot("hero.png", {
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.2,
    });
  });

  test("navbar hover does not break layout", async ({ page }) => {
    const navLink = page.locator("nav a").first();

    const before = await navLink.boundingBox();

    await navLink.hover();
    await page.waitForTimeout(400);

    const after = await navLink.boundingBox();

    expect(after?.height).toBe(before?.height);
  });

  test("CTA hover remains stable", async ({ page }) => {
    const cta = page
      .locator("a, button")
      .filter({ hasText: /get started|start|login|signup/i })
      .first();

    const before = await cta.boundingBox();

    await cta.hover();
    await page.waitForTimeout(400);

    const after = await cta.boundingBox();

    expect(after?.width).toBe(before?.width);
  });

  test("full page snapshot stable", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);

    await expect(page).toHaveScreenshot("homepage.png", {
      fullPage: true,
      animations: "disabled",
      maxDiffPixelRatio: 0.3,
    });
  });
});
