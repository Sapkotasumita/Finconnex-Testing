import { test, expect } from "@playwright/test";

test.describe("Finconnex Login Tests", () => {
  test("user can login successfully", async ({ page }) => {
    await page.goto("https://people.finconnex.com.au/login");

    // Fill credentials (use env variables in real projects)
    await page.fill(
      'input[type="email"]',
      process.env.USER_EMAIL || "test@example.com",
    );
    await page.fill(
      'input[type="password"]',
      process.env.USER_PASSWORD || "password123",
    );

    // Click login
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle" }),
      page.click('button[type="submit"]'),
    ]);

    // Validate successful login (adjust selector)
    await expect(page).not.toHaveURL(/login/);
    await expect(page.locator("body")).toBeVisible();
  });
});
