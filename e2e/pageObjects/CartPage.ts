import { expect, type Locator, type Page } from "@playwright/test";

const CART_ITEM_SELECTOR = "#cestoProdutos";
const CART_SECTION_SELECTOR = "#cart-section";
const FREE_SHIPPING_TEXT = "Portes grátis";
const QUANTITY_INPUT_NAME = "quantidade";
const CART_BUTTON_NAME = "Cesto de compras";
const CHECKOUT_BUTTON_NAME = "Checkout";
const ITEM_COUNT_TEXT = "1 Itens/Total";

export class CartPage {
  readonly page: Page;
  readonly cartItemLocator: Locator;
  readonly cartSummaryLocator: Locator;
  readonly quantityInputLocator: Locator;
  readonly checkoutButton: Locator;
  readonly freeShippingTextLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemLocator = page.locator(CART_ITEM_SELECTOR);
    this.cartSummaryLocator = page.locator(CART_SECTION_SELECTOR);
    this.quantityInputLocator = page.getByRole("spinbutton", {
      name: QUANTITY_INPUT_NAME,
    });
    this.checkoutButton = page.getByRole("button", { name: CHECKOUT_BUTTON_NAME });
    this.freeShippingTextLocator = page.getByText(FREE_SHIPPING_TEXT);
  }

  async openCart() {
    await this.page.getByRole("button", { name: CART_BUTTON_NAME }).click();
  }

  async assertItemInCart(title: string, price: string) {
    await expect(this.cartItemLocator.getByAltText(title)).toBeVisible();
    await expect(this.cartItemLocator).toContainText(title);
    await expect(this.cartItemLocator).toContainText(price);
    await expect(this.quantityInputLocator).toHaveValue("1");
    await expect(this.page.getByRole("link", { name: title })).toBeVisible();
  }

  async assertCartSummary(totalText: string) {
    await expect(this.cartSummaryLocator).toContainText(ITEM_COUNT_TEXT);
    await expect(this.cartSummaryLocator).toContainText(totalText);
  }

  async assertShippingText() {
    await expect(this.freeShippingTextLocator).toBeVisible();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}
