import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Repository } from '../types/github';

interface ErrorResponse {
  message: string;
}

const headers: Record<string, string> = {
  'Accept': 'application/vnd.github.v3+json'
};

if (import.meta.env.VITE_GITHUB_TOKEN) {
  headers['Authorization'] = `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`;
}

export const githubApi = createApi({
  reducerPath: 'github',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.github.com',
    headers
  }),
  endpoints: (builder) => ({
    getUserRepos: builder.query<Repository[], { username: string; page: number }>({
      query: ({ username, page }) => `/users/${username}/repos?per_page=20&page=${page}`,
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return endpointName + queryArgs.username;
      },
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