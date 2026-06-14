import test, { expect } from "@playwright/test";
import { HomePage } from "../../pageobjects/HomePage";
import { BookDetailsPage } from "../../pageobjects/BookDetailsPage";
import { testBooks } from "../../testData/testBooks";

test("Scenario 1: Search book and validate details", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.searchBook(testBooks.book1984.title);
  await homePage.clickFirstBook(testBooks.book1984.title);

  const bookDetailsPage = new BookDetailsPage(page);
  await bookDetailsPage.assertBookDetails(
    testBooks.book1984.title,
    testBooks.book1984.author,
    testBooks.book1984.isbn,
    testBooks.book1984.pages,
    testBooks.book1984.dimensions,
  );
});
