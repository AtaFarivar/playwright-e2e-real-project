// pages/LoginPage.ts
import { Page, expect, test } from "@playwright/test";
import { LoginPageLocators } from "../models/LoginPageLocators";

export class LoginPage {
  constructor(private page: Page) {}

  async fillLoginForm(email: string, password: string) {
    await test.step(`Step: Fill form with email: ${email}`, async () => {
      if (email !== null)
        await this.page.getByTestId(LoginPageLocators.emailInput).fill(email);
      if (password !== null)
        await this.page
          .getByTestId(LoginPageLocators.passwordInput)
          .fill(password);
    });
  }

  async clickLogin() {
    await test.step("Step: Click Login Button", async () => {
      await this.page
        .locator("form")
        .getByRole("button", { name: LoginPageLocators.loginBtn })
        .click();
    });
  }

  async verifyErrorMessage(expectedMessage: string) {
    await test.step(`Step: Verify error message displays: "${expectedMessage}"`, async () => {
      const errorLocator = this.page.getByText(expectedMessage);
      await expect(errorLocator).toBeVisible();
    });
  }

  async verifySuccessfulLogin() {
    await test.step("Step: Verify successful login (Hesabım visible)", async () => {
      const myAccount = this.page
        .getByText(LoginPageLocators.myAccountText)
        .first();
      await expect(myAccount).toBeVisible({ timeout: 15000 });
    });
  }
}
