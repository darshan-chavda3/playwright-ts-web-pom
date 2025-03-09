import { expect, test } from '@playwright/test';
import { Pages } from '../../pages/pages';
import * as data from '../login/data/this.json';

test.describe('[@Feature-Login] Verify Login test scenarios', () => {
    test('[@P1 @Smoke] Verify user login with valid credentials and logout successfully', async ({ page }) => {
        const pages = Pages(page);

        // Login with valid credentials
        await pages.loginPage.gotoLoginPage();
        await pages.loginPage.loginWithCredentials(data.validData.userName, data.validData.password);
        await expect(page).toHaveURL('/inventory.html');

        // Logout to page
        await pages.inventoryPage.logoutUser();
        await expect(page).toHaveURL('/');
    });

    test('[@P1 @Regression] Verify user is unable to login with invalid credentials', async ({ page }) => {
        const pages = Pages(page);

        // Login with invalid credentials
        await pages.loginPage.gotoLoginPage();
        await pages.loginPage.loginWithCredentials(data.invalidData.userName, data.invalidData.password);
        await expect(page).not.toHaveURL('/inventory.html');

        // Verify error message displayed
        await expect(pages.loginPage.errorMessage).toHaveText(data.errorMessage);
    });
});
