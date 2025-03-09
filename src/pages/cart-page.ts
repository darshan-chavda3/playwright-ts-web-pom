import { BasePage, expect } from './base-page';

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

    async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.checkoutButton.click();
        await expect(this.page).toHaveURL('/checkout-step-one.html');
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueButton.click();
    }

    async finalCheckoutStep(itemName: string) {
        await expect(this.itemName).toHaveText(itemName);
        await this.finishButton.click();
    }
}
