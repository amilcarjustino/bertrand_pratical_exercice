# Playwright Automation - Bertrand [Amilcar]

An automated end-to-end test suite for the Bertrand website using Playwright and the Page Object Model (POM) pattern.

## 📌 Prerequisites

- Node.js must be installed locally.
- Minimum supported Node.js version: `18.x`.
- npm is required and is normally installed with Node.js.

## 🚀 Project Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browser binaries
npx playwright install

# 3. Copy environment config and update if needed
cp .env.example .env

# 4. Run all tests
npx playwright test

# 5. View the HTML report
npx playwright show-report

# 6. Run tests in UI mode (interactive)
npx playwright test --ui

# 7. Stress-test a specific file to find flaky behavior
npx playwright test e2e/tests/books/scenario1ValidateBookDetailsScenario1.spec.ts --repeat-each=100 -x
```

## ⚙️ Environment Configuration

This project loads local environment variables from a `.env` file at runtime.

- Copy `.env.example` to `.env` before running tests.
- The configuration is loaded in `playwright.config.ts` using `dotenv.config()`.
- `BASE_URL` is read from the `.env` file and used as the Playwright `baseURL`.
- If `BASE_URL` is not set, the default value is `https://www.bertrand.pt/`.

Example `.env` contents:

```env
BASE_URL=https://www.bertrand.pt/
```

## 📋 Project Structure

### `e2e/tests/books/`
Contains end-to-end scenario files for book-related flows:

- `scenario1ValidateBookDetailsScenario1.spec.ts`
- `scenario2ValidateBookAuthor.spec.ts`
- `scenario3ValidateBookLanguageAndFlag.spec.ts`
- `scenario4BuyABook.spec.ts`

### `e2e/pageObjects/`
Page Object Model implementations for reusable UI interactions:

- `HomePage.ts` - Encapsulates home page and search interactions
- `BookDetailsPage.ts` - Encapsulates book details page interactions
- `CartPage.ts` - Encapsulates cart page interactions
- `CheckoutPage.ts` - Encapsulates checkout page interactions

### `e2e/testData/`
Test data files used by the suite:

- `testBooks.ts` - Book titles, authors, and metadata used across scenarios

## 🌐 Configured Browsers

The suite is configured for desktop browser execution on the following engines:

- `chromium` - Desktop Chrome
- `firefox` - Desktop Firefox
- `webkit` - Desktop Safari

These are the configured browser projects in `playwright.config.ts`.

## 🏗️ Page Object Model (POM) Approach

This project uses the **Page Object Model** design pattern, which provides several benefits:

- **Maintainability**: Locators and interactions are centralized in page objects, making tests easier to update when the UI changes
- **Reusability**: Common page interactions are defined once and reused across multiple tests
- **Readability**: Tests are more readable as they use descriptive methods instead of raw selectors
- **Scalability**: Easy to add new page objects as the test suite grows

Each page object follows a simple structure:
- Constants and selectors are declared at the top of the class
- Locators are created in the constructor using `page.locator(...)`, `page.getByRole(...)`, or `page.getByText(...)`
- Action methods use those locators to perform page interactions

Why constructor-based locators are preferable:
- One place for selectors: changing a selector only requires editing the constructor, not every test method
- Lazy evaluation: Playwright resolves the locator when the action runs, making element lookup safe during page load
- Reusable across methods: the same locator can be used by multiple actions without repeating the selector
- Cleaner separation: constructor setup stays separate from page behavior, making page objects easier to read and maintain

Typical page object flow:
1. Declare selector constants and locator fields
2. Initialize locators once in the constructor
3. Implement action methods like `searchBook()`, `addToCart()`, `openCart()`, and assertion methods like `assertItemInCart()`
4. Keep page details inside the object so tests express user behavior instead of selector logic

## 🛠️ Tech Stack

- **Playwright** - Web automation and testing framework
- **TypeScript** - Type-safe test development
- **Node.js** - Runtime environment
