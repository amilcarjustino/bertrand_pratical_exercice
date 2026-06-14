import { expect, type Locator, type Page } from "@playwright/test";

const WELCOME_MESSAGE = "Seja bem-vindo à sua livraria Bertrand online. Para concluir a sua encomenda,";
const REGISTERED_MESSAGE = "Se já registou o seu e-mail";
const EMAIL_FIELD_NAME = "email";
const PASSWORD_FIELD_NAME = "password";
const LOGIN_BUTTON_NAME = "Entrar";
const UNREGISTERED_MESSAGE = "Se ainda não registou o seu e";
const REGISTER_INSTRUCTIONS = "Se ainda não registou o seu e-mail neste site ou numa livraria Bertrand Registe";
const REGISTER_LINK_NAME = "Registar";

export class CheckoutPage {
  readonly page: Page;
  readonly welcomeMessageLocator: Locator;
  readonly registeredMessageLocator: Locator;
  readonly emailInputLocator: Locator;
  readonly passwordInputLocator: Locator;
  readonly loginButtonLocator: Locator;
  readonly unregisteredMessageLocator: Locator;
  readonly registerInstructionsLocator: Locator;
  readonly registerLinkLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessageLocator = page.getByText(WELCOME_MESSAGE);
    this.registeredMessageLocator = page.getByText(REGISTERED_MESSAGE);
    this.emailInputLocator = page.getByRole("textbox", {
      name: EMAIL_FIELD_NAME,
    });
    this.passwordInputLocator = page.getByRole("textbox", {
      name: PASSWORD_FIELD_NAME,
    });
    this.loginButtonLocator = page.getByRole("button", {
      name: LOGIN_BUTTON_NAME,
    });
    this.unregisteredMessageLocator = page.getByText(UNREGISTERED_MESSAGE);
    this.registerInstructionsLocator = page.getByText(REGISTER_INSTRUCTIONS);
    this.registerLinkLocator = page.getByRole("link", {
      name: REGISTER_LINK_NAME,
    });
  }

  async assertLoginRegisterOptionsVisible() {
    await expect(this.welcomeMessageLocator).toBeVisible();
    await expect(this.registeredMessageLocator).toBeVisible();
    await expect(this.emailInputLocator).toBeVisible();
    await expect(this.passwordInputLocator).toBeVisible();
    await expect(this.loginButtonLocator).toBeVisible();
    await expect(this.unregisteredMessageLocator).toBeVisible();
    await expect(this.registerInstructionsLocator).toBeVisible();
    await expect(this.registerLinkLocator).toBeVisible();
  }
}
