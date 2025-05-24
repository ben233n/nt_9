// favoriteSlice.js ✅ 新增檔案
import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
    addFavorite: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(id => id !== action.payload);
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;