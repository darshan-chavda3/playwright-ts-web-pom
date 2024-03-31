import { BasePage } from "./base-page";

export class CartPage extends BasePage {
  checkoutButton = this.page.locator('//button[@id="checkout"]');
  firstName = this.page.locator('//input[@id="first-name"]');
  lastName = this.page.locator('//input[@id="last-name"]');
  postalCode = this.page.locator('//input[@id="postal-code"]');
  continueButton = this.page.locator('//input[@id="continue"]');
  finishButton = this.page.locator('//button[@id="finish"]');
  itemName = this.page.locator('//div[@class="inventory_item_name"]');
  successMessage = this.page.locator('//h2[@class="complete-header"]');
  backHomeButton = this.page.locator('//button[@id="back-to-products"]');
  postalErrorMessage = this.page.locator('//h3[@data-test="error"]');
}
