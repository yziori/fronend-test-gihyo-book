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

test('メッセージが表示される', async ({ page }) => {
  await page.goto('/');

  const message = page.getByText('ログインに成功しました');

  await expect(message).toBeVisible();
});

test('フォームフィールドが表示される', async ({ page }) => {
  await page.goto('/login');

  const emailInput = page.getByLabel('メールアドレス');

  await expect(emailInput).toBeVisible();
});

test('プレースホルダーが設定されている', async ({ page }) => {
  await page.goto('/search');

  const searchInput = page.getByPlaceholder('キーワードを入力');

  await expect(searchInput).toBeVisible();
});

// テストIDはあくまで最終手段
test('カスタムコンポーネントが表示される', async ({ page }) => {
  await page.goto('/');

  const customElement = page.getByTestId('user-profile');

  await expect(customElement).toBeVisible();
});

test('ボタンをクリックするとメッセージが表示される', async ({ page }) => {
  await page.goto('/');

  // ボタンをクリック
  await page.getByRole('button', { name: '表示' }).click();

  await expect(page.getByText('ボタンがクリックされました')).toBeVisible();
});

test('フォームに入力できる', async ({ page }) => {
  await page.goto('/contact');

  // フォームに値を入力
  await page.getByLabel('お名前').fill('山田太郎');
  await page.getByLabel('メールアドレス').fill('yamada@example.com');
  await page.getByLabel('お問い合わせ内容').fill('テスト送信');

  // 入力された値を確認
  await expect(page.getByLabel('お名前')).toHaveValue('山田太郎');
  await expect(page.getByLabel('メールアドレス')).toHaveValue(
    'yamada@example.com',
  );
});

test('チェックボックスを選択できる', async ({ page }) => {
  await page.goto('/settings');

  await page.getByLabel('通知を受け取る').check();
  await expect(page.getByLabel('通知を受け取る')).toBeChecked();

  await page.getByLabel('通知を受け取る').uncheck();
  await expect(page.getByLabel('通知を受け取る')).not.toBeChecked();
});

test('セレクトボックスで選択できる', async ({ page }) => {
  await page.goto('/form');

  // 値で選択
  await page.getByLabel('都道府県').selectOption('tokyo');

  // ラベルで選択
  await page.getByLabel('都道府県').selectOption('東京都');

  await expect(page.getByLabel('都道府県')).toHaveValue('tokyo');
});

test('リンクをクリックすると詳細ページに遷移する', async ({ page }) => {
  await page.goto('/');

  // リンクをクリックする
  await page.getByRole('link', { name: '詳細を見る' }).click();

  // urlが変わったことを確認
  await expect(page).toHaveURL('/details');

  // 遷移先のコンテンツが表示されることを確認
  await expect(page.getByRole('heading', { name: '詳細情報' })).toBeVisible();
});

// 複数の操作を組み合わせたテスト
test('ログインフォームに入力して送信できる', async ({ page }) => {
  await page.goto('/login');

  // フォームに入力
  await page.getByLabel('メールアドレス').fill('user@example.com');
  await page.getByLabel('パスワード').fill('password123');

  // 送信ボタンをクリック
  await page.getByRole('button', { name: 'ログイン' }).click();

  // ダッシュボードページに遷移したことを確認
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('ようこそ、user@example.com'));
});

test('フォーム送信後に成功メッセージが表示される', async ({ page }) => {
  await page.goto('/contact');

  // フォームに入力
  await page.getByLabel('お名前').fill('山田太郎');
  await page.getByLabel('メールアドレス').fill('yamada@example.com');
  await page.getByLabel('お問い合わせ内容').fill('お問い合わせです');

  // 送信ボタンをクリック
  await page.getByRole('button', { name: '送信' }).click();

  await expect(page.getByTestId('loading-spinner')).toBeVisible();
  await expect(
    page.getByTestId('loading-spinner').waitFor({ state: 'hidden' }),
  );

  await expect(page.getByText('送信が完了しました')).toBeVisible();
  await expect(page.getByLabel('お名前')).toHaveValue('');
});
