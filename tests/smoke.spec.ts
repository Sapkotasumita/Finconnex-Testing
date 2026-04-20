import { test, expect } from "@playwright/test";

test("critical pages load", async ({ page }) => {
  const pages = ["/", "/dashboard"];

  for (const url of pages) {
    await page.goto(url);
    await expect(page.locator("body")).toBeVisible();
  }
});
