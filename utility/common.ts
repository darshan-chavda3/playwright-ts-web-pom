import { Page, expect } from "@playwright/test";
import { Play } from "../pages/play";

export class Common {
  constructor(protected page: Page) {
    this.page = page;
  }

  async login(userName: string, password: string) {
    const play = new Play(this.page);
    await this.page.goto('/');
    await play.loginPage.userName.fill(userName);
    await play.loginPage.password.fill(password);
    await play.loginPage.loginButton.click();
    await expect(this.page).toHaveURL('/inventory.html');
  }
}