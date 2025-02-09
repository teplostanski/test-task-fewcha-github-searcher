import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from '../pages/home/api/userRepos';
import { searchSlice } from '../pages/home/model/searchSlice';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    search: searchSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 