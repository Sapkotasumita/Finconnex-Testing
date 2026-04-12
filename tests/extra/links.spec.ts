import { test, expect } from "@playwright/test";

test("no broken links on homepage", async ({ page }) => {
  await page.goto("/");

  const links = await page.locator("a").all();

  for (const link of links) {
    const href = await link.getAttribute("href");

    if (!href || href.startsWith("#")) continue;

    const response = await page.request.get(href);

    expect(response.status()).toBeLessThan(400);
  }
});
