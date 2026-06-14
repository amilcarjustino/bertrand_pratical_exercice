import test from "@playwright/test";
import { HomePage } from "../../pageObjects/HomePage";
import { BookDetailsPage } from "../../pageObjects/BookDetailsPage";
import { CartPage } from "../../pageObjects/CartPage";
import { CheckoutPage } from "../../pageObjects/CheckoutPage";
import { testBooks } from "../../testData/testBooks";

test("Scenario 4: Buy a book - User not logged in", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.searchAndSelectTheBook(testBooks.bookDoNotDisturb.title);

  const bookDetailsPage = new BookDetailsPage(page);
  await bookDetailsPage.addToCart();

  const cartPage = new CartPage(page);
  await cartPage.openCart();
  await cartPage.assertItemInCart(testBooks.bookDoNotDisturb.title, testBooks.bookDoNotDisturb.price);
  await cartPage.assertCartSummary( testBooks.bookDoNotDisturb.price);
  await cartPage.assertShippingText();
  await cartPage.goToCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.assertLoginRegisterOptionsVisible();
});
