import { Page, expect, test } from "@playwright/test";
import { LoginPageLocators } from "../models/LoginPageLocators";

export class LoginPage {
  constructor(private page: Page) {}

  async fillLoginForm(email: string, password: string) {
    await test.step(`Step: Fill email: ${email}`, async () => {
      await this.page.getByTestId("email-input").fill(email);
    });

    await test.step("Step: Fill password: ********", async () => {
      await this.page.getByTestId("password-input").fill(password);
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
    await test.step(`Step: Verify error box contains: "${expectedMessage}"`, async () => {
      const errorBox = this.page.locator(LoginPageLocators.errorMessage);

      await expect(errorBox).toBeVisible();
      await expect(errorBox).toContainText(expectedMessage);
    });
  }

  async verifySuccessfulLogin() {
    await test.step("Step: Verify 'Hesabım' is visible", async () => {
      await expect(
        this.page.getByText(LoginPageLocators.myAccountText).first()
      ).toBeVisible({ timeout: 15000 });
    });
  }
}
