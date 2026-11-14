import { test, expect } from '@playwright/test';

test('ホームページのタイトルが正しく表示される', async ({ page }) => {
  // ページにアクセス
  await page.goto('/');

  // ページタイトルを確認
  await expect(page).toHaveTitle('My App');
});

test('見出しテキストが表示される', async ({ page }) => {
  await page.goto('/');

  // h1 要素を取得
  const heading = page.locator('h1');

  // テキストコンテンツを検証
  await expect(heading).toHaveText('ようこそ');
});

test('ボタンが表示される', async ({ page }) => {
  await page.goto('/');

  // role が buttonの要素を取得
  const button = page.getByRole('button', { name: '送信' });

  await expect(button).toBeVisible();
});
