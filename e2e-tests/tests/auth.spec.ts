import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow user to log in", async ({ page }) => {
  await page.goto(UI_URL);

  // click header login button and sign in with credentials in login form
  await page.getByRole("link", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("playwright@test.com");
  await page.locator("[name=password]").fill("password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Successfully logged in!")).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});

// click header login button and register with credentials in register form
test("should allow user to register", async ({ page }) => {
  //create random email
  const testUserEmail = `playwright_${
    Math.floor(Math.random() * 90000) + 10000
  }@mail.com`;

  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("link", { name: "Register here" }).click();

  await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();

  await page.locator("[name=email]").fill(testUserEmail);
  await page.locator("[name=password]").fill("password");
  await page.locator("[name=confirmPassword]").fill("password");
  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Successfully registered!")).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});
