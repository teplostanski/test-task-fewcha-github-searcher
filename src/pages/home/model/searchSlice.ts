import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';

interface SearchState {
  username: string;
  page: number;
}

const initialState: SearchState = {
  username: '',
  page: 1
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.page = 1;
    },
    incrementPage: (state) => {
      state.page += 1;
    }
  }
});

export const { setUsername, incrementPage } = searchSlice.actions;

export const selectUsername = (state: RootState) => state.search.username;
export const selectPage = (state: RootState) => state.search.page; 