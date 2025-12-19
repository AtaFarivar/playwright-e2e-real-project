import { test } from "../fixtures/baseTest";
import { LoginCredentials } from "../Credentials";
import { AppMessages } from "../AppMessages";

test.describe("Trendyol Login Tests @login", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.closePopup();
    await homePage.clickLogin();
  });

  test("Scenario 01: Valid credentials", async ({ loginPage }) => {
    await loginPage.fillLoginForm(
      LoginCredentials.validUser.email,
      LoginCredentials.validUser.password
    );
    await loginPage.clickLogin();
    await loginPage.verifySuccessfulLogin();
  });

  test("Scenario 02: Invalid email", async ({ loginPage }) => {
    await loginPage.fillLoginForm(
      LoginCredentials.invalidUserName.email,
      LoginCredentials.invalidUserName.password
    );
    await loginPage.clickLogin();
    await loginPage.verifyErrorMessage(AppMessages.loginPage.wrongPassMail);
  });

  test("Scenario 03: Invalid password", async ({ loginPage }) => {
    await loginPage.fillLoginForm(
      LoginCredentials.invalidPassword.email,
      LoginCredentials.invalidPassword.password
    );
    await loginPage.clickLogin();
    await loginPage.verifyErrorMessage(AppMessages.loginPage.wrongPassMail);
  });

  test("Scenario 04: Empty password field", async ({ loginPage }) => {
    await loginPage.fillLoginForm(
      LoginCredentials.emptyPasword.email,
      LoginCredentials.emptyPasword.password
    );
    await loginPage.clickLogin();
    await loginPage.verifyErrorMessage(
      AppMessages.loginPage.emptyPasswordError
    );
  });

  test("Scenario 05: Leading space in email", async ({ loginPage }) => {
    await loginPage.fillLoginForm(
      LoginCredentials.spaceInUserName1.email,
      LoginCredentials.spaceInUserName1.password
    );
    await loginPage.clickLogin();
    await loginPage.verifyErrorMessage(AppMessages.loginPage.invalidEmailError);
  });

  test("Scenario 06: Trailing space in email", async ({ loginPage }) => {
    await loginPage.fillLoginForm(
      LoginCredentials.spaceInUserName2.email,
      LoginCredentials.spaceInUserName2.password
    );
    await loginPage.clickLogin();
    await loginPage.verifyErrorMessage(AppMessages.loginPage.invalidEmailError);
  });
});
