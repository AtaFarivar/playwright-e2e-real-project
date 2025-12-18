// tests/homepage.spec.ts
import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test("Trendyol Home Page Test", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();
  await homePage.closePopup();
  await homePage.verifyLogo();
  await homePage.clickLogin();
});
