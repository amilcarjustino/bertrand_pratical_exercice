import { expect, type Locator, type Page } from "@playwright/test";

export class BookDetailsPage {
  readonly page: Page;
  readonly bookTitleLocator: Locator;
  readonly bookAuthorLocator: Locator;
  readonly isbnNumberLocator: Locator;
  readonly bookPagesLocator: Locator;
  readonly dimensionsValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bookTitleLocator = page.getByRole("heading", { level: 1 });
    this.bookAuthorLocator = page.getByRole("heading", { level: 3 });
    this.isbnNumberLocator = page.getByText("ISBN:").locator("div");
    this.bookPagesLocator = page.getByText("Páginas:").locator("div");
    this.dimensionsValue = page.getByText("Dimensões:").locator("div");
  }

  async expectDetails(
    title: string,
    author: string,
    isbn: string,
    pages: string,
    dimensions: string,
  ) {
    await expect(this.bookTitleLocator).toHaveText(title);
    await expect(this.bookAuthorLocator).toHaveText(author);
    await expect(this.isbnNumberLocator).toContainText(isbn);
    await expect(this.bookPagesLocator).toContainText(pages);
    await expect(this.dimensionsValue).toContainText(dimensions);
  }
}
