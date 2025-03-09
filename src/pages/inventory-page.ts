import { BasePage, expect } from './base-page';

export class InventoryPage extends BasePage {
    burgerMenu = this.page.locator('//button[@id="react-burger-menu-btn"]');
    allItemsOption = this.page.locator('//a[text()="All Items"]');
    aboutOption = this.page.locator('//a[text()="About"]');
    logoutOption = this.page.locator('//a[text()="Logout"]');
    resetAppStateOption = this.page.locator('//a[text()="Reset App State"]');
    burgerMenuClose = this.page.locator('//button[@id="react-burger-cross-btn"]');
    addCartBackpackButton = this.page.locator('//button[@id="add-to-cart-sauce-labs-backpack"]');
    cartButton = this.page.locator('//div[@id="shopping_cart_container"]');

    async logoutUser() {
        await this.burgerMenu.click();
        await this.logoutOption.click();
    }

    async navigateToCartPage() {
        await this.addCartBackpackButton.click();
        await this.cartButton.click();
        await expect(this.page).toHaveURL('/cart.html');
    }
}
