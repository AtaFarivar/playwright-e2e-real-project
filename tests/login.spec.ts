// tests/login.spec.ts
import { test } from "../fixtures/baseTest";
import { LoginCredentials } from "../Credentials";
import { AppMessages } from "../AppMessages";

test.describe("Feature: Trendyol User Login @login", () => {
  // Runs before each scenario to ensure a fresh, clean state
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.closePopup();
    await homePage.clickLogin();
  });

  // Scenario 1: Valid Login
  test("Scenario 01: Login with valid credentials", async ({ loginPage }) => {
    await loginPage.fillLoginForm(
      LoginCredentials.validUser.email,
      LoginCredentials.validUser.password
    );
    await loginPage.clickLogin();
    await loginPage.verifySuccessfulLogin();
  });

  // Scenario 2: Wrong Email
  test("Scenario 02: Login with invalid username", async ({ loginPage }) => {
    await loginPage.fillLoginForm(
      LoginCredentials.invalidUserName.email,
      LoginCredentials.invalidUserName.password
    );
    await loginPage.clickLogin();
    await loginPage.verifyErrorMessage(AppMessages.loginPage.wrongPassMail);
  });

  // Scenario 3: Wrong Password
  test("Scenario 03: Login with invalid password", async ({ loginPage }) => {
    await loginPage.fillLoginForm(
      LoginCredentials.invalidPassword.email,
      LoginCredentials.invalidPassword.password
    );
    await loginPage.clickLogin();
    await loginPage.verifyErrorMessage(AppMessages.loginPage.wrongPassMail);
  });

  // Scenario 4: Empty Password
  test("Scenario 04: Login with empty password field", async ({
    loginPage,
  }) => {
    await loginPage.fillLoginForm(
      LoginCredentials.emptyPasword.email,
      LoginCredentials.emptyPasword.password
    );
    await loginPage.clickLogin();
    await loginPage.verifyErrorMessage(
      AppMessages.loginPage.emptyPasswordError
    );
  });

  // Scenario 5: Leading Space
  test("Scenario 05: Email with leading space validation", async ({
    loginPage,
  }) => {
    await loginPage.fillLoginForm(
      LoginCredentials.spaceInUserName1.email,
      LoginCredentials.spaceInUserName1.password
    );
    await loginPage.clickLogin();
    await loginPage.verifyErrorMessage(AppMessages.loginPage.invalidEmailError);
  });

  // Scenario 6: Trailing Space
  test("Scenario 06: Email with trailing space validation", async ({
    loginPage,
  }) => {
    await loginPage.fillLoginForm(
      LoginCredentials.spaceInUserName2.email,
      LoginCredentials.spaceInUserName2.password
    );
    await loginPage.clickLogin();
    await loginPage.verifyErrorMessage(AppMessages.loginPage.invalidEmailError);
  });
});
