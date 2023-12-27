import { Page } from "@playwright/test";
import { LoginPage } from "./login-page";
import { InventoryPage } from "./inventory-page";

export class Play {
  constructor(protected page: Page) {
    this.page = page;
  }

  public get loginPage(): LoginPage {
    return new LoginPage(this.page);
  }

  public get inventoryPage(): InventoryPage {
    return new InventoryPage(this.page);
  }
}