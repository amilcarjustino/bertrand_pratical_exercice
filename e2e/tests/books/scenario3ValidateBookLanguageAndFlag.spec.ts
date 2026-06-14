import test from "@playwright/test";
import { HomePage } from "../../pageobjects/HomePage";
import { BookDetailsPage } from "../../pageobjects/BookDetailsPage";
import { testBooks } from "../../testData/testBooks";

test("Scenario 3: Search book and validate language and flag", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.searchAndSelectTheBook(testBooks.bookDoNotDisturb.title);

  const bookDetailsPage = new BookDetailsPage(page);
  await bookDetailsPage.assertBookLanguage(testBooks.bookDoNotDisturb.language);
  await bookDetailsPage.assertBookLanguageFlag(testBooks.bookDoNotDisturb.language);
});
