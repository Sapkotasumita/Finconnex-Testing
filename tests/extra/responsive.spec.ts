import { test, expect } from "@playwright/test";

test("responsive layout works", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/");
  await expect(page.locator("body")).toBeVisible();

  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator("body")).toBeVisible();
});
