import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems:[]
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems: (state, action) => {
      const existingItem = state.cartItems.find(item => item.name === action.payload.name);
    
      if (existingItem) {
        // 如果已經有這個商品，增加它的數量
        existingItem.num += action.payload.num;
      } else {
        // 否則新增進購物車
        state.cartItems.push(action.payload);
      }
    },
    cartsub: (state, action) => {
      const existingItem = state.cartItems.find(item => item.name === action.payload.name);
      if (existingItem && existingItem.num > 1) {
        existingItem.num--;
      }
      else{
        state.cartItems = state.cartItems.filter(item => item.name !== action.payload.name);
      }
    },
    cartadd:(state, action)=>{
      const existingItem = state.cartItems.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.num++;
      }
    },    
    updateQuantity: (state, action) => {
      const { name, num } = action.payload;
      const existingItem = state.cartItems.find(item => item.name === name);
      if (existingItem) {
        existingItem.num = num;
      }
    },    
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.name !== action.payload.name); // 根據商品名稱移除
    },

  }
});

export const {addItems,cartsub,cartadd,updateQuantity,removeItem} = cartSlice.actions;

export default cartSlice.reducer;