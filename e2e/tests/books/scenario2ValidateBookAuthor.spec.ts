import test, { expect } from "@playwright/test";
import { HomePage } from "../../pageObjects/HomePage";
import { BookDetailsPage } from "../../pageObjects/BookDetailsPage";
import { testBooks } from "../../testData/testBooks";

test("Scenario 2: Search book and verify other book of the same author", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.searchAndSelectTheBook(testBooks.book1984.title);

  const bookDetailsPage = new BookDetailsPage(page);
  await bookDetailsPage.assertOtherAuthorBook(testBooks.bookQuintaDosAnimais.title);
});
