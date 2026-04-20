import { test, expect } from "@playwright/test";

test("user redirected to login if session expires", async ({ page }) => {
  await page.goto("/dashboard");

  // Clear session
  await page.context().clearCookies();

  await page.reload();

  await expect(page).toHaveURL(/login/);
});
