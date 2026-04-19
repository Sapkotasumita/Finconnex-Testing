import { chromium } from "@playwright/test";

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://people.finconnex.com.au/login");

  await page.fill('input[type="email"]', process.env.USER_EMAIL!);
  await page.fill('input[type="password"]', process.env.USER_PASSWORD!);

  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type="submit"]'),
  ]);

  //  Save logged-in session
  await page.context().storageState({ path: "storageState.json" });

  await browser.close();
}

export default globalSetup;
