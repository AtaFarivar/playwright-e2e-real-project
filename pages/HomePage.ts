import { Page, Locator, expect, test } from "@playwright/test";
import { HomePageLocators } from "../models/HomePageLocators";

export class HomePage {
  readonly page: Page;
  readonly closeBtn: Locator;
  readonly loginMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.closeBtn = page.locator(HomePageLocators.closePopUpSelector);
    this.loginMenu = page.getByText(HomePageLocators.loginMenuText).first();
  }

  /**
   * Opens the homepage using the baseURL defined in playwright.config.ts
   */
  async open() {
    await test.step("Step: Open Trendyol Homepage", async () => {
      // Using "/" ensures we use the baseURL from the configuration file
      await this.page.goto("/");
    });
  }

  /**
   * Closes the initial marketing popup if it's visible
   */
  async closePopup() {
    await test.step("Step: Close initial marketing popup", async () => {
      if (await this.closeBtn.isVisible()) {
        await this.closeBtn.click();
      }
    });
  }

  /**
   * Clicks on the login menu to navigate to the login page
   */
  async clickLogin() {
    await test.step("Step: Navigate to Login Page", async () => {
      await this.loginMenu.click();
    });
  }

  /**
   * Verifies that the Trendyol logo is visible
   */
  async verifyLogo() {
    await test.step("Step: Verify Trendyol logo visibility", async () => {
      const logo = this.page.getByRole("link", {
        name: HomePageLocators.trendyolLogoName,
      });
      await expect(logo).toBeVisible();
    });
  }
}
