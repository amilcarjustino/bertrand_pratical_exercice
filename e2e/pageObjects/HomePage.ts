import { expect, type Locator, type Page } from "@playwright/test";

const HOME_PAGE_URL = "/";
const SEARCH_INPUT_NAME = "texto para pesquisa";
const COOKIE_CONSENT_BUTTON_NAME = "Aceitar Todos";
const HOME_PAGE_SECTION_HEADING_LEVEL = 2;

const sectionsTitle = [
    'Novidades a não perder',
    'Pré-lançamentos',
    'Os melhores descontos | até -',
    'Os mais procurados online',
    'Conexões Literárias | Temas',
    'Os livros de que todos falam',
    'Livros da semana com 50%',
  ];

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

  // Dynamic locators for sections headings
  async getSectionLocator(title: string) {
    return this.page.getByRole("heading", { level: HOME_PAGE_SECTION_HEADING_LEVEL, name: title });
  }

  async goto() {
    await this.page.goto(HOME_PAGE_URL);
    await this.acceptCookieConsent();
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
    await this.searchBook(bookTitle);
    await this.clickFirstBook(bookTitle);
  }

  async clickFirstBook(bookTitle: string) {
    await this.page.getByAltText(bookTitle).first().click();
  }

  async expectSectionsVisible() {
    for (const title of sectionsTitle) {
      const section = await this.getSectionLocator(title);
      await expect(section).toBeVisible();
    }
  }
}
