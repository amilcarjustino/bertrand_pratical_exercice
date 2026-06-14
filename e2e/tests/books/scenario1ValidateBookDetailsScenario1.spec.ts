import test, { expect } from "@playwright/test";
import { HomePage } from "../../pageobjects/HomePage";
import { BookDetailsPage } from "../../pageobjects/BookDetailsPage";

const testBook1 = {
  title: "1984",
  author: "George Orwell",
  isbn: "9789722071550",
  pages: "344",
  dimensions: "156 x 238 x 22 mm",
};

test("Scenario 1: Search book and validate details", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.searchBook(testBook1.title);
  await homePage.clickFirstBook(testBook1.title);

  const bookDetailsPage = new BookDetailsPage(page);
  await bookDetailsPage.assertBookDetails(
    testBook1.title,
    testBook1.author,
    testBook1.isbn,
    testBook1.pages,
    testBook1.dimensions,
  );
});
