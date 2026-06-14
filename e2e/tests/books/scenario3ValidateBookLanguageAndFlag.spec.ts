import test from "@playwright/test";
import { HomePage } from "../../pageObjects/HomePage";
import { BookDetailsPage } from "../../pageObjects/BookDetailsPage";
import { testBooks } from "../../testData/testBooks";

test("Scenario 3: Search book and validate language and flag", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.searchAndSelectTheBook(testBooks.bookDoNotDisturb.title);

  const bookDetailsPage = new BookDetailsPage(page);

  await bookDetailsPage.assertBookAuthor(testBooks.bookDoNotDisturb.author);
  await bookDetailsPage.assertBookLanguage(testBooks.bookDoNotDisturb.language);
  await bookDetailsPage.assertBookLanguageFlag(testBooks.bookDoNotDisturb.language);
});
