import { test, expect } from "@playwright/test";
import { Pages } from "../pages/pages";
import * as loginData from "../data/login-data.json";
import * as shoppingData from "../data/shopping-data.json";

test("@P1 @Smoke verify that the customer is able to place an order with complete information", async ({ page }) => {
  const pages = Pages(page);

  // Login with valid credentials
  await pages.loginPage.login(loginData.userName, loginData.password);

  // Navigate to cart page
  await pages.inventoryPage.navigateToCartPage()
  await expect(pages.cartPage.itemName).toHaveText(shoppingData.itemName);

  // Enter checkout informations
  await pages.cartPage.checkoutInformation(shoppingData.firstName, shoppingData.lastName, shoppingData.postalCode)
  await expect(page).toHaveURL("/checkout-step-two.html");

  // Verify checkout success message
  await pages.cartPage.finalCheckoutStep(shoppingData.itemName)
  await expect(page).toHaveURL("/checkout-complete.html");
  await expect(pages.cartPage.successMessage).toHaveText(shoppingData.successMessage);

  // Navigate to home page
  await expect(pages.cartPage.backHomeButton).toBeVisible();
  await pages.cartPage.backHomeButton.click();
  await expect(page).toHaveURL("/inventory.html");
});

test("@P1 @Regression verify that the customer is unable to place an order with incomplete information", async ({ page }) => {
  const pages = Pages(page);

  // Login with valid credentials
  await pages.loginPage.login(loginData.userName, loginData.password);

  // Navigate to cart page
  await pages.inventoryPage.navigateToCartPage()
  await expect(pages.cartPage.itemName).toHaveText(shoppingData.itemName);

  // Enter checkout informations
  await pages.cartPage.checkoutInformation(shoppingData.firstName, shoppingData.lastName, "")
  await expect(page).not.toHaveURL("/checkout-step-two.html");

  // Verify error message displayed
  await expect(pages.cartPage.postalErrorMessage).toHaveText(shoppingData.postalErrorMessage);
});
