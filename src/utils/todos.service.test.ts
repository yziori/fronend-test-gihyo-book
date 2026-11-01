import { getTodos, saveTodos } from './todos.service';

describe('Todo ストレージ操作', () => {
  afterEach(() => {
    // テスト実行後にクリアすることでテスト間でlocalStorageを共有してしまわないようにする
    // describe.concurrentは使えないけどね..
    localStorage.clear();
  });

  it('localStorageからTodosを取得できる', () => {
    const todo = { id: 1, text: 'Write init tests' };
    localStorage.setItem('todos', JSON.stringify([todo]));

    expect(getTodos()).toEqual([todo]);
  });

  it('Todos を localStorage に保存できる', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem');
    const todos = [{ id: 1, text: 'Write init tests' }];

    saveTodos(todos);

    // getTodosとかは使わないでもspyなら検証可能
    expect(spy).toHaveBeenCalledWith('todos', JSON.stringify(todos));
    spy.mockRestore();
  });

  it('localStorageが空の場合は空配列を返す', () => {
    expect(getTodos()).toEqual([]);
  });
});
