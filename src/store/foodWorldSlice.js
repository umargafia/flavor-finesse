import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'all',
  FavoriteClassList: [],
};

const foodWorldSlice = createSlice({
  name: 'foodWorld',
  initialState,
  reducers: {
    setFoodType: (state, action) => {
      state.type = action.payload;
    },
    setFavoriteClassList: (state, action) => {
      state.FavoriteClassList = action.payload;
    },
  },
});

export const { setFoodType, setFavoriteClassList } = foodWorldSlice.actions;
export default foodWorldSlice.reducer;
