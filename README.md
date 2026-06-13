# Playwright Automation - Bertrand [Amilcar]

An example of a automated end-to-end test suite for the Bertrand website using Playwright and the Page Object Model (POM) pattern.

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
npx playwright test e2e/tests/books/validateBook.spec.ts --repeat-each=100 -x
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