import test from "@playwright/test";
import { HomePage } from "../../pageObjects/HomePage";


test("Scenario 5: Validate home page sections", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  await homePage.expectSectionsVisible();
});
