import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
}

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action) => {
          // 把 action.payload（傳入的使用者資料）指定給 state.user
          state.user = action.payload;
        },
        // 清除登入狀態
      clearUser: (state) => {
          // 把 user 設為 null，等於登出
          state.user = null;
      }
    }
});

export const {setUser,clearUser} = userSlice.actions

export default userSlice.reducer