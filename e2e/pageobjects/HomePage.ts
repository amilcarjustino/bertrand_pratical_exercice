import { expect, type Locator, type Page } from "@playwright/test";

const HOME_PAGE_URL = "https://www.bertrand.pt/";
const SEARCH_INPUT_NAME = "texto para pesquisa";

export class HomePage {
  readonly page: Page;
  readonly searchInputLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInputLocator = page.getByRole("textbox", {
      name: SEARCH_INPUT_NAME,
    });
  }

  async goto() {
    await this.page.goto(HOME_PAGE_URL);
  }

  async searchBook(bookTitle: string) {
    await this.searchInputLocator.click();
    await this.searchInputLocator.fill(bookTitle);
  }

  async clickFirstBook(bookTitle: string) {
    await this.page.getByAltText(bookTitle).first().click();
  }
}
