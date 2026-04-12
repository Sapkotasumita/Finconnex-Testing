import { test, expect } from "@playwright/test";

test("basic accessibility check", async ({ page }) => {
  await page.goto("/");

  const h1 = page.locator("h1");

  await expect(h1).toHaveCount(1);
});
