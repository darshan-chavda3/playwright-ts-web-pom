import { Page } from "@playwright/test";

export class LoginPage {
  constructor(protected page: Page) {
    this.page = page;
  }

  userName = this.page.locator('//input[@id="user-name"]');
  password = this.page.locator('//input[@id="password"]');
  loginButton = this.page.locator('//input[@id="login-button"]');
  errorMessage = this.page.locator('//h3[@data-test="error"]');
}