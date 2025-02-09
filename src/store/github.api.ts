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
    getUserRepos: builder.query<Repository[], string>({
      query: (username) => `/users/${username}/repos`,
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