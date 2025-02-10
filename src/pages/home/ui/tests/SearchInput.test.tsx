import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '../SearchInput';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { searchSlice } from '../../model/searchSlice';
import { DEBOUNCE_DELAY } from '../../../../shared/constants/github';

const createMockStore = () => {
  return configureStore({
    reducer: {
      search: searchSlice.reducer
    }
  });
};

describe('SearchInput', () => {
  it('должен отрендерить инпут с плейсхолдером', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Введите имя пользователя...')).toBeInTheDocument();
  });

  it('должен вызвать setUsername с задержкой при вводе', async () => {
    vi.useFakeTimers();
    const store = createMockStore();
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Введите имя пользователя...');
    fireEvent.change(input, { target: { value: 'test-user' } });

    expect(dispatchSpy).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(DEBOUNCE_DELAY);

    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
      type: 'search/setUsername',
      payload: 'test-user'
    }));

    vi.useRealTimers();
  });
}); 