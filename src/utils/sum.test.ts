import { sum } from './sum';

describe('sum関数の単体テスト', () => {
  it('空の配列を渡した場合、結果は0になる', () => {
    const numbers: number[] = [];
    const result = sum(numbers);
    expect(result).toBe(0);
  });

  it('複数の正の値を数値に渡した時、正しく合計を返す', () => {
    const numbers: number[] = [0, 2, 5];
    const result = sum(numbers);
    expect(result).toBe(7);
  });

  it('負の値を含む配列を渡しても正しく合計を返す', () => {
    const numbers: number[] = [0, -2, 5];
    const result = sum(numbers);
    expect(result).toBe(3);
  });

  it('要素が一つだけでも正しく合計を返す', () => {
    const numbers: number[] = [43];
    const result = sum(numbers);
    expect(result).toBe(43);
  });
});
