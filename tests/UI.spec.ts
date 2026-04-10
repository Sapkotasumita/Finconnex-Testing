import { test, expect } from "@playwright/test";

test.describe("Finconnex UI Structure Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://finconnex.vercel.app/", {
      waitUntil: "domcontentloaded",
    });

    await page.evaluate(() => document.fonts?.ready);
    await page.waitForTimeout(1200);
  });

  test("hero section exists", async ({ page }) => {
    const hero = page.locator("section").first();

    await expect(hero).toBeVisible();
  });

  test("layout spacing is not broken", async ({ page }) => {
    const hero = page.locator("section").first();
    const nextSection = page.locator("section").nth(1);

    const heroBox = await hero.boundingBox();
    const nextBox = await nextSection.boundingBox();

    if (!heroBox || !nextBox) return;

    const gap = nextBox.y - (heroBox.y + heroBox.height);

    expect(gap).toBeLessThan(300); // responsive-safe threshold
  });

  test("all navigation links are visible", async ({ page }) => {
    const links = page.locator("nav a");

    const count = await links.count();

    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toBeVisible();
    }
  });
});
