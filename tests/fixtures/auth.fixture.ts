import { test as base } from "@playwright/test";

export const test = base.extend({
  authPage: async ({ page }, use) => {
    await page.goto("/");

    // future login logic here
    // await page.fill(...)
    // await page.click(...)

    await use(page);
  },
});

export { expect } from "@playwright/test";
