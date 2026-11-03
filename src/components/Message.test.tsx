import { render } from '@testing-library/react';
import { Message } from './Message';

// スモークテスト
test('Messageコンポーネントがクラッシュせずにレンダリングできる', () => {
  render(<Message />);
});
