import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
  userName = this.page.locator('//input[@id="user-name"]');
  password = this.page.locator('//input[@id="password"]');
  loginButton = this.page.locator('//input[@id="login-button"]');
  errorMessage = this.page.locator('//h3[@data-test="error"]');

  async login(userName: string, password: string) {
    const page = this.page;
    await this.page.goto("/");
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
