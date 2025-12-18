import { defineConfig, devices } from "@playwright/test";
import fs from "fs";
import path from "path";

// Clean old reports automatically
const reportDirs = ["allure-results", "playwright-report", "test-results"];
reportDirs.forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath))
    fs.rmSync(dirPath, { recursive: true, force: true });
});

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  reporter: [
    ["html"],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],
  use: {
    baseURL: "https://www.trendyol.com",
    headless: false,
    launchOptions: { slowMo: 500 },
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
