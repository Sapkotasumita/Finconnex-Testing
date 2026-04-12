import { test, expect } from "@playwright/test";

test("SEO basics are valid", async ({ page }) => {
  await page.goto("/");

  const title = await page.title();
  expect(title.length).toBeGreaterThan(5);

  const h1 = page.locator("h1");
  await expect(h1.first()).toBeVisible();
});
