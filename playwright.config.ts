import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration with Single Source of Truth for URL and Allure reporting.
 */
export default defineConfig({
  testDir: "./tests",

  /* Set to false to watch tests run sequentially */
  fullyParallel: false,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  /* Unified Reporters: Standard HTML and Allure */
  reporter: [
    ["html"],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],

  use: {
    /* 1. Single Source of Truth for the URL */
    baseURL: "https://www.trendyol.com",

    /* 2. Show the browser (Headless: false) */
    headless: false,

    /* 3. Delay for visibility */
    launchOptions: {
      slowMo: 500,
    },

    /* 4. Debugging Artifacts */
    video: "retain-on-failure", // Record video only when a test fails
    screenshot: "only-on-failure", // Take screenshot on failure
    trace: "on-first-retry", // Record trace on first retry
  },

  /* Multi-browser projects */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
