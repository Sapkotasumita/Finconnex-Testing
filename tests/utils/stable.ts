import { Page } from "@playwright/test";

export async function stabilize(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.waitForLoadState("networkidle").catch(() => {});

  await page.evaluate(() => document.fonts?.ready);

  await page.waitForTimeout(1200);
}
