// Credentials.ts

export const LoginCredentials = {
  // Scenario 1: Valid credentials
  validUser: {
    email: process.env.TRENDYOL_EMAIL || "",
    password: process.env.TRENDYOL_PASSWORD || "",
  },

  // Scenario 2: Invalid email with valid password
  invalidUserName: {
    email: "test1@example.com",
    password: process.env.TRENDYOL_PASSWORD || "",
  },

  // Scenario 3: Valid email with invalid password
  invalidPassword: {
    email: process.env.TRENDYOL_EMAIL || "",
    password: "Password123456",
  },

  // Scenario 4: Empty password field
  emptyPasword: {
    email: process.env.TRENDYOL_EMAIL || "",
    password: "",
  },

  // Scenario 5: Leading space in email
  spaceInUserName1: {
    email: ` ${process.env.TRENDYOL_EMAIL}` || "",
    password: process.env.TRENDYOL_PASSWORD || "",
  },

  // Scenario 6: Trailing space in email
  spaceInUserName2: {
    email: `${process.env.TRENDYOL_EMAIL} ` || "",
    password: process.env.TRENDYOL_PASSWORD || "",
  },
} as const;
