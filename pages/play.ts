import { Page } from "@playwright/test";
import { LoginPage } from "./login-page";
import { InventoryPage } from "./inventory-page";
import { CartPage } from "./cart-page";

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

  public get cartPage(): CartPage {
    return new CartPage(this.page);
  }
}