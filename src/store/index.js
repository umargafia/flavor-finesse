import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import foodWorldSlice from './foodWorldSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    foodWorld: foodWorldSlice,
  },
});

export default store;
