import { renderHook, act } from '@testing-library/react';
import { useTimer } from './useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    // もし本物のタイマー依存のものがあった時に動作しなくなるからね
    vi.useRealTimers();
  });

  it('初期状態では停止している。', () => {
    const { result } = renderHook(() => useTimer(5, 500));

    expect(result.current.count).toBe(5);
    expect(result.current.isRunning).toBe(false);
  });

  it('startで開始し、指定間隔でカウントが増加する', () => {
    const { result } = renderHook(() => useTimer(0, 500));

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);

    // 1.5秒タイマーを進める
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.count).toBe(3);
  });

  it('stopでカウントが停止する', () => {
    const { result } = renderHook(() => useTimer(0, 500));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.count).toBe(2);

    act(() => {
      result.current.stop();
    });

    // actはここまでの更新を画面に反映し終える単位
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.count).toBe(2);
    expect(result.current.isRunning).toBeFalsy();
  });

  it('restで初期値に戻り停止する', () => {
    const { result } = renderHook(() => useTimer(0, 500));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.count).toBe(2);

    act(() => {
      result.current.reset();
    });

    expect(result.current.isRunning).toBeFalsy();
    expect(result.current.count).toBe(0);
  });
});
