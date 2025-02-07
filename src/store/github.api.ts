import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
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
    }
  }),
  endpoints: (builder) => ({
    getUserRepos: builder.query<Repository[], string>({
      query: (username) => ({
        url: `/users/${username}/repos`,
        validateStatus: (response, result) => 
          response.status === 200 && Array.isArray(result)
      }),
      transformErrorResponse: (response): ErrorResponse => 
        response.status === 404 
          ? { message: 'Пользователь не найден' }
          : { message: 'Произошла ошибка при загрузке данных' }
    }),
  }),
});

export const { useGetUserReposQuery } = githubApi; 