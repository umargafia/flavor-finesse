import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'all',
};

const foodWorldSlice = createSlice({
  name: 'foodWorld',
  initialState,
  reducers: {
    setFoodType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setFoodType } = foodWorldSlice.actions;
export default foodWorldSlice.reducer;
