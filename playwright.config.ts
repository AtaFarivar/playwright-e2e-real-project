import { defineConfig, devices } from "@playwright/test";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

/**
 * 1. Load environment variables from the .env file.
 */
dotenv.config({ path: path.resolve(__dirname, ".env") });

// ------------------- DEBUG SECTION -------------------
console.log("\n==================================================");
console.log("🔍 ENV VARIABLE CHECK:");
console.log(
  "EMAIL    :",
  process.env.TRENDYOL_EMAIL ? "✅ Loaded" : "❌ undefined"
);
console.log(
  "PASSWORD :",
  process.env.TRENDYOL_PASSWORD ? "✅ Loaded" : "❌ undefined"
);
console.log("==================================================\n");

/**
 * 2. Auto-clean old reports and results.
 */
const reportDirs = ["allure-results", "playwright-report", "test-results"];
reportDirs.forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
});

/**
 * 3. Main Framework Configuration
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,

  /* The directory where artifacts like screenshots and videos are stored */
  outputDir: "test-results/",

  reporter: [
    ["html", { open: "never" }], // 'never' prevents opening multiple tabs
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],

  use: {
    baseURL: "https://www.trendyol.com",
    headless: false,
    launchOptions: {
      slowMo: 500,
    },

    /* Optimized Media Settings */
    video: {
      mode: "retain-on-failure",
      size: { width: 1280, height: 720 }, // Defining size helps with rendering
    },
    screenshot: "on", // Change to "on" temporarily to test if it captures anything
    trace: "on", // Trace is the best tool for debugging
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // 2. Firefox (Uncomment to enable)
    /*
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    */

    // 3. Safari - Webkit (Uncomment to enable)
    /*
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    */
  ],
});
