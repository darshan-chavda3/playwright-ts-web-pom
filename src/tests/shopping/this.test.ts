import { test, expect } from '@playwright/test';
import { Pages } from '../../pages/pages';
import * as loginData from '../login/data/this.json';
import * as shoppingData from '../shopping/data/this.json';

test.beforeEach('Login with valid credentials', async ({ page }) => {
    const pages = Pages(page);
    await pages.loginPage.gotoLoginPage();
    await pages.loginPage.loginWithCredentials(loginData.validData.userName, loginData.validData.password);
    await expect(page).toHaveURL('/inventory.html');
});

test.describe('[@Feature-Shopping] Verify Shopping test scenarios', () => {
    test('[@P1 @Smoke] Verify that the customer is able to place an order with complete information', async ({ page }) => {
        const pages = Pages(page);

        // Navigate to cart page
        await pages.inventoryPage.navigateToCartPage();
        await expect(pages.cartPage.itemName).toHaveText(shoppingData.itemName);

        // Enter checkout informations
        await pages.cartPage.enterCheckoutInformation(shoppingData.firstName, shoppingData.lastName, shoppingData.postalCode);
        await expect(page).toHaveURL('/checkout-step-two.html');

        // Verify checkout success message
        await pages.cartPage.finalCheckoutStep(shoppingData.itemName);
        await expect(page).toHaveURL('/checkout-complete.html');
        await expect(pages.cartPage.successMessage).toHaveText(shoppingData.messages.success);

        // Navigate to home page
        await expect(pages.cartPage.backHomeButton).toBeVisible();
        await pages.cartPage.backHomeButton.click();
        await expect(page).toHaveURL('/inventory.html');
    });

    test('[@P1 @Regression] Verify that the customer is unable to place an order with incomplete information', async ({ page }) => {
        const pages = Pages(page);

        // Navigate to cart page
        await pages.inventoryPage.navigateToCartPage();
        await expect(pages.cartPage.itemName).toHaveText(shoppingData.itemName);

        // Enter checkout informations
        await pages.cartPage.enterCheckoutInformation(shoppingData.firstName, shoppingData.lastName, '');
        await expect(page).not.toHaveURL('/checkout-step-two.html');

        // Verify error message displayed
        await expect(pages.cartPage.postalErrorMessage).toHaveText(shoppingData.messages.postal);
    });
});
