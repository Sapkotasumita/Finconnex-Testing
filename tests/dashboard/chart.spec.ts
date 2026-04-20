import { test, expect } from "@playwright/test";

test("chart contains data points", async ({ page }) => {
  await page.goto("/dashboard");

  const chart = page.locator("canvas, svg");

  await expect(chart.first()).toBeVisible();
});
