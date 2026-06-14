import test, { expect } from "@playwright/test";
import { HomePage } from "../../pageObjects/HomePage";
import { testBooks } from "../../testData/testBooks";



test("Scenario 4: User not logged in - Buy a book", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.searchAndSelectTheBook(testBooks.bookDoNotDisturb.title);



await page.goto('https://www.bertrand.pt/');
await page.getByRole('button', { name: 'Aceitar Todos' }).click();
await page.getByRole('textbox', { name: 'texto para pesquisa' }).click();
await page.getByRole('textbox', { name: 'texto para pesquisa' }).fill('do not disturb');
await page.locator('#item-auto-complete-0').getByRole('link').filter({ hasText: 'Do Not Disturb' }).click();
await page.getByRole('button', { name: 'Comprar' }).click();
await page.getByRole('button', { name: 'Cesto de compras' }).click();
await expect(page.locator('#product-line-0')).toContainText('Do Not Disturb');
await expect(page.locator('#product-line-0')).toContainText('12.16€');
await expect(page.getByRole('spinbutton', { name: 'quantidade' })).toHaveValue('1');
await expect(page.getByRole('link', { name: 'Do Not Disturb' })).toBeVisible();
await expect(page.locator('#cart-section')).toContainText('1 Itens/Total');
await expect(page.locator('#cart-section')).toContainText('12.16€');
await expect(page.locator('#cart-section')).toContainText('Poupança 1.35€');
await expect(page.getByText('Portes grátisi')).toBeVisible();
await page.getByRole('button', { name: 'Checkout' }).click();
await expect(page.getByText('Seja bem-vindo à sua livraria Bertrand online. Para concluir a sua encomenda,')).toBeVisible();
await expect(page.getByText('Se já registou o seu e-mail')).toBeVisible();
await expect(page.getByRole('textbox', { name: 'email' })).toBeVisible();
await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible();
await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
await expect(page.getByText('Se ainda não registou o seu e')).toBeVisible();
await expect(page.getByText('Se ainda não registou o seu e-mail neste site ou numa livraria Bertrand Registe')).toBeVisible();
await expect(page.getByRole('link', { name: 'Registar' })).toBeVisible();



}