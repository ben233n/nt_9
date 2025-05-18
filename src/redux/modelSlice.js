import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: 'light',
}

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    bangModel: (state) => {
        // 切換模式
        state.mode = state.mode === 'light' ? 'dark' : 'light';
      },

    setTheme: (state, action) => {
      state.mode = action.payload;
    },
    clearTheme: (state) => {
      // 把 user 設為 null，等於登出
      state.user = null;
  }

  }
});

export const { setTheme,bangModel } = modelSlice.actions;

export default modelSlice.reducer