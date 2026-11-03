import { render, screen } from '@testing-library/react';
import { Welcome } from './Welcome';

test('ログイン済みの場合、ウェルカムメッセージを表示する', () => {
  render(<Welcome isLoggedIn={true} />);
  expect(screen.getByText('ようこそ！')).toBeInTheDocument();
});

test('未ログイン済みの場合、ウェルカムメッセージを表示しない', () => {
  render(<Welcome isLoggedIn={false} />);
  // 要素が存在しないことを検証する場合はqueryBy系の関数を使用する
  expect(screen.queryByText('ようこそ！')).toBeNull();
});
