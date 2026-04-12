import { test, expect } from "@playwright/test";

test("navbar is visible and stable", async ({ page }) => {
  await page.goto("/");

  const nav = page.locator("nav");

  await expect(nav).toBeVisible();

  const links = nav.locator("a");
  const count = await links.count();

  expect(count).toBeGreaterThan(0);
});
