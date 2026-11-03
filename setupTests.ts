// jest-domのマッチャーをvitestのexpectで使用できるようにするもの
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';

// React Testing Library19以降では自動的にafterEachが登録されるため、この記述は省略可能
afterEach(() => {
  // テストが終わる度にレンダリングされたDOMをアンマウントして初期化する。
  cleanup();
});
