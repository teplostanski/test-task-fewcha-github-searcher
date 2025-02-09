import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  updated_at: string;
}

interface ErrorResponse {
  message: string;
}

export const githubApi = createApi({
  reducerPath: 'github',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.github.com',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': 'Bearer '
    }
  }),
  endpoints: (builder) => ({
    getUserRepos: builder.query<Repository[], { username: string; page: number }>({
      query: ({ username, page }) => `/users/${username}/repos?per_page=20&page=${page}`,
      serializeQueryArgs: ({ queryArgs }) => queryArgs.username,
      merge: (currentCache, newItems, { arg: { page } }) => {
        if (page === 1) return newItems;
        return [...currentCache, ...newItems];
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      transformErrorResponse: (response): ErrorResponse => {
        if (response.status === 404) {
          return { message: 'Такого пользователя не существует' };
        }
        if (response.status === 403) {
          return { message: 'Превышен лимит запросов к API GitHub. Пожалуйста, подождите немного.' };
        }
        return { message: 'Произошла ошибка при загрузке данных' };
      }
    }),
  }),
});

export const { useGetUserReposQuery } = githubApi; 