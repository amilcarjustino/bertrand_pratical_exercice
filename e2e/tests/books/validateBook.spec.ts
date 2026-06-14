import test, { expect } from "@playwright/test";

test("Search book and validate details", async ({ page }) => {
  const testBook = {
    title: "1984",
    author: "George Orwell",
    isbn: "9789722071550",
    pages: "344",
    dimensions: "156 x 238 x 22 mm",
  };

  await page.goto("https://www.bertrand.pt/");

  await page.getByRole("textbox", { name: "texto para pesquisa" }).click();
  await page.getByRole("textbox", { name: "texto para pesquisa" }).fill("1984");
  await page.getByAltText(testBook.title).first().click();

  await expect(
    page.getByRole("heading", { level: 1, name: "1984" }),
  ).toBeVisible();

  const heading = page.getByRole("heading", {
    level: 3,
    name: "George Orwell",
  });
  await expect(heading).toBeVisible();
  await expect(heading.getByRole("link")).toBeVisible();

  await expect(page.getByText("ISBN:").locator("div")).toContainText(
    testBook.isbn,
  );
  await expect(page.getByText("Páginas:").locator("div")).toContainText(
    testBook.pages,
  );
  await expect(page.getByText("Dimensões:").locator("div")).toContainText(
    testBook.dimensions,
  );
});
