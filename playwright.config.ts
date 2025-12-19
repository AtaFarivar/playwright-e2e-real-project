import { defineConfig, devices } from "@playwright/test";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * Cleanup only on Local machine.
 */
if (!process.env.CI) {
  const reportDirs = ["allure-results", "playwright-report", "test-results"];
  reportDirs.forEach((dir) => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
  });
}

/**
 * Create Allure results directory.
 */
const allurePath = path.join(__dirname, "allure-results");
if (!fs.existsSync(allurePath)) {
  fs.mkdirSync(allurePath, { recursive: true });
}

const envFilePath = path.join(__dirname, "environment.properties");
if (fs.existsSync(envFilePath)) {
  fs.copyFileSync(envFilePath, path.join(allurePath, "environment.properties"));
}

export default defineConfig({
  testDir: "./tests",

  // Set to false to avoid database/session conflicts on Trendyol
  fullyParallel: false,

  // We keep retries to stabilize flaky tests, but we want to see the failures too
  retries: process.env.CI ? 1 : 0,

  // Single worker in CI ensures Allure files are written correctly without race conditions
  workers: process.env.CI ? 1 : undefined,

  outputDir: "test-results/",

  reporter: [
    ["html", { open: "never" }],
    [
      "allure-playwright",
      {
        outputFolder: "allure-results",
        detail: true,
        suiteTitle: true, // Categorize tests by browser/project name in Allure
      },
    ],
  ],

  use: {
    baseURL: "https://www.trendyol.com",
    headless: !!process.env.CI,
    launchOptions: {
      slowMo: 500,
    },
    // Captured files help debug why a test failed before a successful retry
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    /*
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],
});
