import { expect, type Locator, type Page } from "@playwright/test";

const BOOK_TITLE_HEADING_LEVEL = 1;
const BOOK_AUTHOR_HEADING_LEVEL = 3;
const ISBN_LABEL = "ISBN:";
const PAGES_LABEL = "Páginas:";
const DIMENSIONS_LABEL = "Dimensões:";

export class BookDetailsPage {
  readonly page: Page;
  readonly bookTitleLocator: Locator;
  readonly bookAuthorLocator: Locator;
  readonly isbnNumberLocator: Locator;
  readonly bookPagesLocator: Locator;
  readonly dimensionsValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bookTitleLocator = page.getByRole("heading", { level: BOOK_TITLE_HEADING_LEVEL });
    this.bookAuthorLocator = page.getByRole("heading", { level: BOOK_AUTHOR_HEADING_LEVEL });
    this.isbnNumberLocator = page.getByText(ISBN_LABEL).locator("div");
    this.bookPagesLocator = page.getByText(PAGES_LABEL).locator("div");
    this.dimensionsValue = page.getByText(DIMENSIONS_LABEL).locator("div");
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
