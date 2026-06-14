import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly searchInputLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInputLocator = page.getByRole("textbox", {
      name: "texto para pesquisa",
    });
  }

  async goto() {
    await this.page.goto("https://www.bertrand.pt/");
  }

  async searchBook(bookTitle: string) {
    await this.searchInputLocator.click();
    await this.searchInputLocator.fill(bookTitle);
  }

  async clickFirstBook(bookTitle: string) {
    await this.page.getByAltText(bookTitle).first().click();
  }
}
