import { Page } from "@playwright/test";

export async function waitForPageStable(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}
