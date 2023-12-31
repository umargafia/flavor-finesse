import { createSlice } from '@reduxjs/toolkit';

import { getData } from '../constants/storage';

const initialState = {
  isAuthenticated: false,
  token: '',
  user: null,
  favorites: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setError: (state, action) => {
      state.error === action.payload;
    },
    saveFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const checkUser = async (dispatch) => {
  try {
    const user = await getData('user');
    if (user) {
      dispatch(loginUser(user));
    }
  } catch (error) {}
};

export const { loginUser, logout, setError, saveFavorites } = authSlice.actions;
export default authSlice.reducer;
