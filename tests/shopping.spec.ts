import { test, expect } from "@playwright/test";
import { Pages } from "../pages/pages";
import * as loginData from "../data/login-data.json";
import * as shoppingData from "../data/shopping-data.json";

test("@P1 @Smoke verify that the customer is able to place an order with complete information", async ({ page }) => {
  const pages = Pages(page);
  await pages.common.login(loginData.userName, loginData.password);
  await pages.inventoryPage.addCartBackpackButton.click();
  await pages.inventoryPage.cartButton.click();
  await expect(page).toHaveURL("/cart.html");
  await expect(pages.cartPage.itemName).toHaveText(shoppingData.itemName);
  await pages.cartPage.checkoutButton.click();
  await expect(page).toHaveURL("/checkout-step-one.html");
  await pages.cartPage.firstName.fill(shoppingData.firstName);
  await pages.cartPage.lastName.fill(shoppingData.lastName);
  await pages.cartPage.postalCode.fill(shoppingData.postalCode);
  await pages.cartPage.continueButton.click();
  await expect(page).toHaveURL("/checkout-step-two.html");
  await expect(pages.cartPage.itemName).toHaveText(shoppingData.itemName);
  await pages.cartPage.finishButton.click();
  await expect(page).toHaveURL("/checkout-complete.html");
  await expect(pages.cartPage.successMessage).toHaveText(shoppingData.successMessage);
  await expect(pages.cartPage.backHomeButton).toBeVisible();
  await pages.cartPage.backHomeButton.click();
  await expect(page).toHaveURL("/inventory.html");
});

test("@P1 @Regression verify that the customer is unable to place an order with incomplete information", async ({ page }) => {
  const pages = Pages(page);
  await pages.common.login(loginData.userName, loginData.password);
  await pages.inventoryPage.addCartBackpackButton.click();
  await pages.inventoryPage.cartButton.click();
  await expect(page).toHaveURL("/cart.html");
  await expect(pages.cartPage.itemName).toHaveText(shoppingData.itemName);
  await pages.cartPage.checkoutButton.click();
  await expect(page).toHaveURL("/checkout-step-one.html");
  await pages.cartPage.firstName.fill(shoppingData.firstName);
  await pages.cartPage.lastName.fill(shoppingData.lastName);
  await pages.cartPage.continueButton.click();
  await expect(page).not.toHaveURL("/checkout-step-two.html");
  await expect(pages.cartPage.postalErrorMessage).toHaveText(shoppingData.postalErrorMessage);
});
