# 🎭 Playwright E2E Testing Project - Trendyol

This repository contains an automated End-to-End (E2E) testing suite for **Trendyol**, built with **Playwright**, **TypeScript**, and **Allure Reports**.

---

## 🚀 Live Test Report
You can view the latest automated test results here:
👉 **[View Allure Report](https://atafarivar.github.io/playwright-e2e-real-project/)**

---

## 🛠 Features & Architecture
- **Framework**: Playwright (for fast, reliable, and cross-browser testing).
- **Language**: TypeScript (for type safety and better developer experience).
- **Design Pattern**: Page Object Model (POM) for maintainable and scalable code.
- **Reporting**: Allure Report with historical data tracking.
- **CI/CD**: Integrated with GitHub Actions for automated execution on every push.
- **Environment Management**: Secure handling of credentials using GitHub Secrets.

---

## 🧪 Test Scenarios
The suite currently includes **7 automated tests** covering:
- ✅ **Homepage Visibility**: Verifying core UI elements and marketing popups.
- ✅ **Authentication Suite**:
  - Valid Login (using secure environment variables).
  - Invalid Email/Password combinations.
  - Edge cases like empty fields and trailing/leading spaces in inputs.

---

## ⚙️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AtaFarivar/playwright-e2e-real-project.git
   cd playwright-e2e-real-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Run tests:**
   ```bash
   npx playwright test
   ```

5. **Generate & Open Allure Report:**
   ```bash
   npx playwright test --reporter=allure-playwright
   npx allure serve allure-results
   ```

---

## 🤖 CI/CD Integration
Tests are automatically triggered on:

- Every push to main or master branches.
- Every pull_request.
- Manual trigger via the "Run workflow" button in the GitHub Actions tab.

---

Created by Ata Farivar
