import { defineConfig, devices } from "@playwright/test";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file (for local execution only)
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * Cleanup old report folders before starting new tests
 */
const reportDirs = ["allure-results", "playwright-report", "test-results"];
reportDirs.forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
});

/**
 * Create Allure results directory.
 * Using { recursive: true } prevents "EEXIST" errors during parallel CI execution.
 */
const allurePath = path.join(__dirname, "allure-results");
fs.mkdirSync(allurePath, { recursive: true });

// Inject Environment properties for the Allure Report
const envFilePath = path.join(__dirname, "environment.properties");
if (fs.existsSync(envFilePath)) {
  fs.copyFileSync(envFilePath, path.join(allurePath, "environment.properties"));
}

export default defineConfig({
  testDir: "./tests",

  // Running tests sequentially to maintain stability on heavy websites like Trendyol
  fullyParallel: false,

  // Folder for detailed test artifacts (videos, traces)
  outputDir: "test-results/",

  reporter: [
    ["html", { open: "never" }],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],

  use: {
    baseURL: "https://www.trendyol.com",

    /**
     * SMART HEADLESS MODE:
     * Local machine: Runs with browser UI (headless: false) for debugging.
     * GitHub Actions (CI): Runs without UI (headless: true) to avoid XServer errors.
     */
    headless: !!process.env.CI,

    launchOptions: {
      slowMo: 500,
    },

    // Capture artifacts only on failure to keep report sizes optimized
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
