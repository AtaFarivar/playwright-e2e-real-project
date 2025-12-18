import { Page, Locator, expect, test } from "@playwright/test";
import { HomePageLocators } from "../models/HomePageLocators";

export class HomePage {
  constructor(private page: Page) {}

  async open() {
    await test.step("Open Trendyol Homepage", async () => {
      await this.page.goto("/"); // Uses baseURL from config
    });
  }

  async closePopup() {
    await test.step("Close marketing popup", async () => {
      const closeBtn = this.page.locator(HomePageLocators.closePopUpSelector);
      if (await closeBtn.isVisible()) {
        await closeBtn.click();
      }
    });
  }

  async verifyLogo() {
    await test.step("Step: Verify Trendyol logo visibility", async () => {
      const logo = this.page.locator(HomePageLocators.trendyolLogo);
      await expect(logo).toBeVisible({ timeout: 10000 });
    });
  }

  async clickLogin() {
    await test.step("Navigate to Login Page", async () => {
      const loginMenu = this.page
        .getByText(HomePageLocators.loginMenuText)
        .first();
      await loginMenu.click();
    });
  }
}
