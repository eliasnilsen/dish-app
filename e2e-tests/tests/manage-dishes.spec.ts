import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173";

// navigate to home, click header login button and sign in with credentials in login form
test.beforeEach("should allow user to log in", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("playwright@test.com");
  await page.locator("[name=password]").fill("password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Successfully logged in!")).toBeVisible();
});

// create a dish using the form
test("should allow user to create a dish", async ({ page }) => {
  await page.goto(`${UI_URL}/create-dish`);

  await page.locator("[name=name]").fill("test dish");
  await page.locator("[name=description]").fill("test description");
  await page.selectOption("select[name=spiceLevel]", "Medium");
  await page.selectOption("select[name=prepTime]", "4+ hours");
  await page.getByText("Chinese").click();
  await page.getByLabel("Eggs").check();
  await page.getByLabel("Milk").check();
  await page.getByLabel("Wheat").check();

  await page.setInputFiles("[name=imageFiles]", [
    path.join(__dirname, "testImages", "1.jpg"),
    path.join(__dirname, "testImages", "2.jpg"),
    path.join(__dirname, "testImages", "3.jpg"),
  ]);

  await page.getByRole("button", { name: "Create dish" }).click();
  await expect(page.getByText("Successfully created dish!")).toBeVisible();
});
