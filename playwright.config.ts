import { defineConfig, devices } from "@playwright/test";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * Cleanup only on Local machine.
 * GitHub Actions handles its own clean environment for each run.
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
 * Create Allure results directory with environment properties.
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

  // Balanced parallelism for stability
  fullyParallel: false,

  // Retry logic for CI environments
  retries: process.env.CI ? 1 : 0,

  // Use 1 worker on CI to prevent race conditions in Allure results
  workers: process.env.CI ? 1 : undefined,

  outputDir: "test-results/",

  reporter: [
    ["html", { open: "never" }],
    [
      "allure-playwright",
      {
        outputFolder: "allure-results",
        detail: true,
      },
    ],
  ],

  use: {
    baseURL: "https://www.trendyol.com",
    headless: !!process.env.CI,
    launchOptions: {
      slowMo: 500,
    },
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
