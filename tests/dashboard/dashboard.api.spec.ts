import { test, expect } from "@playwright/test";

test.describe("Dashboard API Tests", () => {
  //  Basic API health check
  test("dashboard API responds successfully", async ({ request }) => {
    const response = await request.get("/");

    expect(response.status()).toBeLessThan(400);
  });

  //  Validate JSON response structure (if API exists)
  test("API returns valid JSON", async ({ request }) => {
    const response = await request.get("/api");

    expect(response.status()).toBeLessThan(400);

    const contentType = response.headers()["content-type"];

    if (contentType?.includes("application/json")) {
      const data = await response.json();

      expect(data).toBeTruthy();
    }
  });

  // Response time check
  test("API responds within acceptable time", async ({ request }) => {
    const start = Date.now();

    await request.get("/");

    const duration = Date.now() - start;

    expect(duration).toBeLessThan(5000);
  });
});
