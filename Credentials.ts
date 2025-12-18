export const LoginCredentials = {
  validUser: {
    email: "ata_farivar@yahoo.com",
    password: "6118945@T@",
  },
  invalidUserName: {
    email: "test1@example.com",
    password: "6118945@T@",
  },
  invalidPassword: {
    email: "ata_farivar@yahoo.com",
    password: "Password123456",
  },
  emptyPasword: {
    email: "test1@example.com",
    password: "",
  },
  spaceInUserName1: {
    email: " ata_farivar@yahoo.com",
    password: "6118945@T@",
  },
  spaceInUserName2: {
    email: "ata_farivar@yahoo.com ",
    password: "6118945@T@",
  },
} as const;
