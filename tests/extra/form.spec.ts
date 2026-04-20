import { test, expect } from "@playwright/test";

test("form validation works", async ({ page }) => {
  await page.goto("/contact");

  const submit = page.locator('button[type="submit"]');

  if (await submit.count()) {
    await submit.click();

    await expect(page.locator("text=required")).toBeVisible();
  }
});
