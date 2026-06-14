import { expect, type Locator, type Page } from "@playwright/test";

const BOOK_TITLE_HEADING_LEVEL = 1;
const BOOK_AUTHOR_HEADING_LEVEL = 3;
const ISBN_LABEL = "ISBN:";
const PAGES_LABEL = "Páginas:";
const DIMENSIONS_LABEL = "Dimensões:";
const OTHER_AUTHOR_BOOKS_HEADING = "Outros Livros Do Autor";
const OTHER_AUTHOR_BOOKS_SECTION_SELECTOR =
  "#productPageSectionAboutAuthor-bestsellers-content";
const LANGUAGE_LABEL = "idioma:";
const PRODUCT_PAGE_LANGUAGE_FLAG_SELECTOR =
  "#productPageRightSectionTop-languageFlag";
const LANGUAGE_FLAG_ICON = ".icon.language-flag";
const BUY_BUTTON_NAME = "Comprar";

export class BookDetailsPage {
  readonly page: Page;
  readonly bookTitleLocator: Locator;
  readonly bookAuthorLocator: Locator;
  readonly isbnNumberLocator: Locator;
  readonly bookPagesLocator: Locator;
  readonly dimensionsValue: Locator;
  readonly otherAuthorBooksHeadingLocator: Locator;
  readonly otherAuthorBooksSection: Locator;
  readonly buyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bookTitleLocator = page.getByRole("heading", {
      level: BOOK_TITLE_HEADING_LEVEL,
    });
    this.bookAuthorLocator = page
      .getByRole("heading", { level: BOOK_AUTHOR_HEADING_LEVEL })
      .first();
    this.isbnNumberLocator = page.getByText(ISBN_LABEL).locator("div");
    this.bookPagesLocator = page.getByText(PAGES_LABEL).locator("div");
    this.dimensionsValue = page.getByText(DIMENSIONS_LABEL).locator("div");
    this.otherAuthorBooksHeadingLocator = page.getByText(OTHER_AUTHOR_BOOKS_HEADING);
    this.otherAuthorBooksSection = page.locator(OTHER_AUTHOR_BOOKS_SECTION_SELECTOR);
    this.buyButton = page.getByRole("button", { name: BUY_BUTTON_NAME });
  }

  async assertBookAuthor(expectedAuthor: string) {
    await expect(this.bookAuthorLocator).toContainText(expectedAuthor);
  }

  async assertBookDetails(title: string, author: string, isbn: string, pages: string, dimensions: string) {
    await expect(this.bookTitleLocator).toHaveText(title);
    await this.assertBookAuthor(author);
    await expect(this.isbnNumberLocator).toContainText(isbn);
    await expect(this.bookPagesLocator).toContainText(pages);
    await expect(this.dimensionsValue).toContainText(dimensions);
  }

  async assertOtherAuthorBook(title: string) {
    await expect(this.otherAuthorBooksHeadingLocator).toBeVisible();
    await expect(this.otherAuthorBooksSection.getByAltText(title)).toBeAttached();
    await expect(
      this.otherAuthorBooksSection.getByText(title, { exact: true }),
    ).toBeVisible();
  }

  async assertBookLanguage(language: string) {
    await expect(this.page.getByText(`${LANGUAGE_LABEL} ${language}`, { exact: true })).toBeVisible();
    await expect(this.page.locator(PRODUCT_PAGE_LANGUAGE_FLAG_SELECTOR)).toBeVisible();
  }

  async assertBookLanguageFlag(language: string) {
    await expect(this.page.locator(`${LANGUAGE_FLAG_ICON}.${language}`)).toBeVisible();
  }

  async addToCart() {
    await this.buyButton.click();
  }
}
