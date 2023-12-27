import { expect, test } from "@playwright/test";
import { Play } from "../pages/play";
import { Common } from "../utility/common";
import * as loginData from "../data/login-data.json";
import * as shoppingData from "../data/shopping-data.json";

test('@P1 @Smoke verify that the customer is able to place an order with complete information', async ({ page }) => {
  const play = new Play(page);
  const common = new Common(page);
  await common.login(loginData.userName, loginData.password);
  await play.inventoryPage.addCartBackpackButton.click();
  await play.inventoryPage.cartButton.click();
  await expect(page).toHaveURL('/cart.html');
  await expect(play.cartPage.itemName).toHaveText(shoppingData.itemName);
  await play.cartPage.checkoutButton.click();
  await expect(page).toHaveURL('/checkout-step-one.html');
  await play.cartPage.firstName.fill(shoppingData.firstName);
  await play.cartPage.lastName.fill(shoppingData.lastName);
  await play.cartPage.postalCode.fill(shoppingData.postalCode);
  await play.cartPage.continueButton.click();
  await expect(page).toHaveURL('/checkout-step-two.html');
  await expect(play.cartPage.itemName).toHaveText(shoppingData.itemName);
  await play.cartPage.finishButton.click();
  await expect(page).toHaveURL('/checkout-complete.html');
  await expect(play.cartPage.successMessage).toHaveText(shoppingData.successMessage);
  await expect(play.cartPage.backHomeButton).toBeVisible();
  await play.cartPage.backHomeButton.click();
  await expect(page).toHaveURL('/inventory.html');
})

test('@P1 @Regression verify that the customer is unable to place an order with incomplete information', async ({ page }) => {
  const play = new Play(page);
  const common = new Common(page);
  await common.login(loginData.userName, loginData.password);
  await play.inventoryPage.addCartBackpackButton.click();
  await play.inventoryPage.cartButton.click();
  await expect(page).toHaveURL('/cart.html');
  await expect(play.cartPage.itemName).toHaveText(shoppingData.itemName);
  await play.cartPage.checkoutButton.click();
  await expect(page).toHaveURL('/checkout-step-one.html');
  await play.cartPage.firstName.fill(shoppingData.firstName);
  await play.cartPage.lastName.fill(shoppingData.lastName);
  await play.cartPage.continueButton.click();
  await expect(page).not.toHaveURL('/checkout-step-two.html');
  await expect(play.cartPage.postalErrorMessage).toHaveText(shoppingData.postalErrorMessage);
})