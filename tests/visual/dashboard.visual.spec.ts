import { test, expect } from "@playwright/test";

test("dashboard visual regression", async ({ page }) => {
  await page.goto("/dashboard");

  await page.waitForTimeout(2000);

  await expect(page).toHaveScreenshot("dashboard.png", {
    fullPage: true,
    animations: "disabled",
    maxDiffPixelRatio: 0.3,
  });
});
