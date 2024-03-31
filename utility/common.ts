import { Page, expect } from "@playwright/test";
import { Pages } from "../pages/pages";
import { BasePage } from "../pages/base-page";

export class Common extends BasePage {
  async login(userName: string, password: string) {
    const pages = Pages(this.page);
    await this.page.goto("/");
    await pages.loginPage.userName.fill(userName);
    await pages.loginPage.password.fill(password);
    await pages.loginPage.loginButton.click();
    await expect(this.page).toHaveURL("/inventory.html");
  }
}
