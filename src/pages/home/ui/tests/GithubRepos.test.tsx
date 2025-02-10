import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { GithubRepos } from '../GithubRepos';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { searchSlice } from '../../model/searchSlice';
import * as userReposApi from '../../api/userRepos';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

describe('GithubRepos', () => {
  const createStore = (preloadedState = {}) => {
    return configureStore({
      reducer: {
        search: searchSlice.reducer,
        [userReposApi.githubApi.reducerPath]: userReposApi.githubApi.reducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userReposApi.githubApi.middleware),
      preloadedState
    });
  };

  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('должен отобразить спиннер при первой загрузке', () => {
    const store = createStore({
      search: { username: 'testuser', page: 1 }
    });

    vi.spyOn(userReposApi, 'useGetUserReposQuery').mockImplementation(() => ({
      data: undefined,
      error: undefined,
      isFetching: true,
      isSuccess: false,
      isError: false,
      refetch: vi.fn()
    }));

    render(
      <Provider store={store}>
        <GithubRepos />
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('должен отобразить сообщение об ошибке', () => {
    const store = createStore({
      search: { username: 'testuser', page: 1 }
    });

    vi.spyOn(userReposApi, 'useGetUserReposQuery').mockImplementation(() => ({
      data: undefined,
      error: {
        status: 404,
        data: { message: 'Такого пользователя не существует' }
      } as FetchBaseQueryError,
      isFetching: false,
      isLoading: false,
      isSuccess: false,
      isError: true,
      isUninitialized: false,
      refetch: vi.fn(),
      status: 'rejected'
    }));

    render(
      <Provider store={store}>
        <GithubRepos />
      </Provider>
    );

    expect(screen.getByTestId('error-message')).toHaveTextContent('Такого пользователя не существует');
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});