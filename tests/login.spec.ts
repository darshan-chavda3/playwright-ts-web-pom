import { expect, test } from "@playwright/test";
import * as loginData from "../data/login-data.json";
import { Pages } from "../pages/pages";

test("@P1 @Smoke verify user login with valid credentials and logout successfully", async ({ page }) => {
  const pages = Pages(page);
  await page.goto("/");
  await pages.loginPage.userName.fill(loginData.userName);
  await pages.loginPage.password.fill(loginData.password);
  await pages.loginPage.loginButton.click();
  await expect(page).toHaveURL("/inventory.html");
  await pages.inventoryPage.burgerMenu.click();
  await pages.inventoryPage.logoutOption.click();
  await expect(page).toHaveURL("/");
});

test("@P1 @Regression verify user is unable to login with invalid credentials", async ({ page }) => {
  const pages = Pages(page);
  await page.goto("/");
  await pages.loginPage.userName.fill(loginData.invalidUserName);
  await pages.loginPage.password.fill(loginData.invalidPassword);
  await pages.loginPage.loginButton.click();
  await expect(page).not.toHaveURL("/inventory.html");
  await expect(pages.loginPage.errorMessage).toHaveText(loginData.errorMessage);
});
