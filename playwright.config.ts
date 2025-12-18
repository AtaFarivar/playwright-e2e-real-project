import { defineConfig, devices } from "@playwright/test";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * Cleanup old reports and results folders before starting new tests
 */
const reportDirs = ["allure-results", "playwright-report", "test-results"];
reportDirs.forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
});

/**
 * FIX: Using { recursive: true } prevents "EEXIST" error when multiple
 * workers try to create the directory simultaneously.
 */
const allurePath = path.join(__dirname, "allure-results");
fs.mkdirSync(allurePath, { recursive: true });

// Copy Environment Info for Allure Report
const envFilePath = path.join(__dirname, "environment.properties");
if (fs.existsSync(envFilePath)) {
  fs.copyFileSync(envFilePath, path.join(allurePath, "environment.properties"));
}

export default defineConfig({
  testDir: "./tests",

  // Running tests sequentially to avoid UI overlaps
  fullyParallel: false,

  // Folder for detailed test artifacts (videos, traces)
  outputDir: "test-results/",

  reporter: [
    ["html", { open: "never" }],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],

  use: {
    baseURL: "https://www.trendyol.com",
    headless: false,
    launchOptions: {
      slowMo: 500,
    },

    // Capturing artifacts for debugging failures
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
