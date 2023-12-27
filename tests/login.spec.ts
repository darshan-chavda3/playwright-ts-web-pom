import { expect,test } from "@playwright/test";
import { Play } from "../pages/play";
import * as loginData from "../data/login-data.json"

test('@P1 @Smoke verify user login with valid credentials and logout successfully', async ({ page }) => {
  const play = new Play(page);
  await page.goto('/');
  await play.loginPage.userName.fill(loginData.userName);
  await play.loginPage.password.fill(loginData.password);
  await play.loginPage.loginButton.click();
  await expect(page).toHaveURL('/inventory.html');
  await play.inventoryPage.burgerMenu.click();
  await play.inventoryPage.logoutOption.click();
  await expect(page).toHaveURL('/')
})

test('@P1 @Regression verify user is unable to login with invalid credentials', async ({ page }) => {
  const play = new Play(page);
  await page.goto('/');
  await play.loginPage.userName.fill(loginData.invalidUserName);
  await play.loginPage.password.fill(loginData.invalidPassword);
  await play.loginPage.loginButton.click();
  await expect(page).not.toHaveURL('/inventory.html');
  await expect(play.loginPage.errorMessage).toHaveText(loginData.errorMessage);
})
