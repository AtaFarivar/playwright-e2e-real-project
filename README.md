# 🛡️ Trendyol Automation Suite (Playwright + TypeScript)

This is a high-performance, scalable, and professional-grade automation framework designed for **Trendyol.com**. It utilizes the "Gold Standard" architecture of **Playwright**, focusing on efficiency, readability, and robust reporting.

## ✨ Key Features
- **Page Object Model (POM):** Clean separation of UI elements and test logic.
- **Custom Fixtures:** Using Playwright's dependency injection for cleaner test setup and total isolation.
- **BDD-Style Reporting:** Human-readable test steps using `test.step`.
- **Advanced Insights:** Fully integrated with **Allure Reports** and standard Playwright HTML reports.
- **Debugging Tools:** Automatic **Video Recording** and **Screenshots** on test failure.
- **Cross-Browser Support:** Pre-configured for Chromium, Firefox, and Webkit.

---

## 🔑 Managing Test Credentials

To run the tests with your own user data, you need to modify the credentials file. 

1. Navigate to the root directory.
2. Open the `Credentials.ts` file.
3. Update the `validUser` object with your own email and password:

```typescript
// Credentials.ts
export const LoginCredentials = {
  validUser: {
    email: "your_email@example.com", // Change this
    password: "your_password",      // Change this
  },
  // ... other edge case data
} as const;
```

## 🛠️ Tech Stack
Framework: Playwright

Language: TypeScript

Architecture: POM & Fixtures

Reports: Allure & HTML Report

## 📂 Project Structure
Plaintext

```
├── fixtures/           # Dependency injection (BaseTest)
├── models/             # Locators & Constants
├── pages/              # Page Objects (Logic & Actions)
├── tests/              # Test Scenarios (@login)
├── Credentials.ts      # Test Data management
├── AppMessages.ts      # Centralized validation messages
└── playwright.config.ts# Global Configuration (Video, Allure, etc.)
```

## 🚀 Getting Started
### 1. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
npm install
```

### 2. Run Tests
To execute all login scenarios:

```bash
npx playwright test --grep @login
```

### 3. Generate Reports
To view the visual Allure dashboard:

```bash
npx allure serve allure-results
```

To view the default Playwright report:

```bash
npx playwright show-report
```

## 📝 Test Scenarios
Current implementation covers:

✅ Successful Login with valid credentials.

❌ Login with incorrect password/email.

❌ Form validation for empty fields.

❌ Security checks for leading/trailing spaces in input fields.
