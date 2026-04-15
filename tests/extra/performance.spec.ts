import { test, expect } from "@playwright/test";

test("page loads under 5 seconds", async ({ page }) => {
  const start = Date.now();

  await page.goto("/");

  await page.waitForLoadState("domcontentloaded");

  const loadTime = Date.now() - start;

  expect(loadTime).toBeLessThan(5000);
});
