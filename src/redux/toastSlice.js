import { createSlice } from '@reduxjs/toolkit'


// 建立一個 toast slice，包含初始狀態與 reducer
const toastSlice = createSlice({
    name: "toast", // slice 名稱
    initialState: {
      message: "",    // Toast 顯示的文字訊息
      visible: false, // 是否顯示
      id: 0,
    },
    reducers: {
      showToast: (state, action) => {
        state.message = action.payload; // 將訊息設為 payload 傳進來的文字
        state.visible = true;           // 設定為顯示狀態
        state.id = Date.now(); // 每次 showToast 都給一個新的 id（用時間戳）
      },
      hideToast: (state) => {
        state.visible = false;          // 將 Toast 隱藏
      },
    },
  });

  export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer