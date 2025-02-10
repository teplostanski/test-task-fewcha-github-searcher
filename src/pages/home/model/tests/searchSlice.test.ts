import { describe, it, expect } from 'vitest';
import { searchSlice, setUsername, incrementPage, selectUsername, selectPage } from '../searchSlice';

describe('searchSlice', () => {
  it('должен установить начальное состояние', () => {
    const state = searchSlice.getInitialState();
    expect(state).toEqual({
      username: '',
      page: 1
    });
  });

  describe('reducers', () => {
    it('setUsername должен обновить username и сбросить page', () => {
      const initialState = { username: '', page: 3 };
      const action = setUsername('test-user');
      const state = searchSlice.reducer(initialState, action);

      expect(state.username).toBe('test-user');
      expect(state.page).toBe(1);
    });

    it('incrementPage должен увеличить page на 1', () => {
      const initialState = { username: 'test-user', page: 1 };
      const state = searchSlice.reducer(initialState, incrementPage());

      expect(state.page).toBe(2);
      expect(state.username).toBe('test-user');
    });
  });

  describe('selectors', () => {
    const mockRootState = {
      search: {
        username: 'test-user',
        page: 5
      }
    };

    it('selectUsername должен вернуть текущий username', () => {
      expect(selectUsername(mockRootState as any)).toBe('test-user');
    });

    it('selectPage должен вернуть текущий page', () => {
      expect(selectPage(mockRootState as any)).toBe(5);
    });
  });
}); 