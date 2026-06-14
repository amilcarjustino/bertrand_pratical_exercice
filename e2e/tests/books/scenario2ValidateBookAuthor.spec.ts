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

const testBook2 = {
  title: "Quinta dos Animais",
  author: "George Orwell",
  isbn: "9789722071550",
  pages: "344",
  dimensions: "156 x 238 x 22 mm",
};

test("Scenario 2: Search book and verify other book of the same author", async ({ page }) => {
  const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchBook(testBook1.title);
    await homePage.clickFirstBook(testBook1.title);
  
    const bookDetailsPage = new BookDetailsPage(page);
    await bookDetailsPage.assertOtherAuthorBook(testBook2.title);

});
