import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

test('正しい認証情報でログインできる', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
  await expect(page).toHaveURL('/dashboard');
  await dashboardPage.expectWelcomMessage('user@example.com');
});

test('誤った認証情報ではログインできない', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('user@example.com', 'wrongpassword');

  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain(
    'メールアドレスまたはパスワードが正しくありません',
  );
  await expect(page).toHaveURL('/login');
});
