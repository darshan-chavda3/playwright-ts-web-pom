import { Page } from "@playwright/test";

export class InventoryPage {
  constructor(protected page: Page) {
    this.page = page;
  }

  burgerMenu = this.page.locator('//button[@id="react-burger-menu-btn"]');
  allItemsOption = this.page.locator('//a[text()="All Items"]');
  aboutOption = this.page.locator('//a[text()="About"]');
  logoutOption = this.page.locator('//a[text()="Logout"]');
  resetAppStateOption = this.page.locator('//a[text()="Reset App State"]');
  burgerMenuClose = this.page.locator('//button[@id="react-burger-cross-btn"]');
  addCartBackpackButton = this.page.locator('//button[@id="add-to-cart-sauce-labs-backpack"]');
  cartButton = this.page.locator('//div[@id="shopping_cart_container"]');
}