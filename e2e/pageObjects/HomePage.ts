import { type Locator, type Page } from "@playwright/test";

const HOME_PAGE_URL = "/";
const SEARCH_INPUT_NAME = "texto para pesquisa";
const COOKIE_CONSENT_BUTTON_NAME = "Aceitar Todos";

export class HomePage {
  readonly page: Page;
  readonly searchInputLocator: Locator;
  readonly cookieConsentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInputLocator = page.getByRole("textbox", {
      name: SEARCH_INPUT_NAME,
    });
    this.cookieConsentButton = page.getByRole("button", {
      name: COOKIE_CONSENT_BUTTON_NAME,
    });
  }

  async goto() {
    await this.page.goto(HOME_PAGE_URL);
  }

  async acceptCookieConsent() {
    if ((await this.cookieConsentButton.count()) > 0 && (await this.cookieConsentButton.isVisible())) {
      await this.cookieConsentButton.click();
    }
  }

  async searchBook(bookTitle: string) {
    await this.searchInputLocator.click();
    await this.searchInputLocator.fill(bookTitle);
  }

  async searchAndSelectTheBook(bookTitle: string) {
    await this.goto();
    await this.acceptCookieConsent();
    await this.searchBook(bookTitle);
    await this.clickFirstBook(bookTitle);
  }

  async clickFirstBook(bookTitle: string) {
    await this.page.getByAltText(bookTitle).first().click();
  }
}
