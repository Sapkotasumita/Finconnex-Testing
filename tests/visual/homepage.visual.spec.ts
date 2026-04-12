import { test, expect } from "@playwright/test";

test("homepage visual regression", async ({ page }) => {
  await page.goto("/");

  await page.waitForTimeout(2000);

  await expect(page).toHaveScreenshot("homepage.png", {
    fullPage: true,
    animations: "disabled",
    maxDiffPixelRatio: 0.3,
  });
});
