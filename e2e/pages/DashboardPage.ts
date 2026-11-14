import { expect, Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.getByTestId('welcome-message');
    this.loginButton = page.getByRole('button', { name: 'ログアウト' });
  }

  async goto() {
    await this.page.goto('/dashboard');
  }

  async expectWelcomMessage(email: string) {
    await expect(this.welcomeMessage).toHaveText(`ようこそ、${email}`);
  }
}
