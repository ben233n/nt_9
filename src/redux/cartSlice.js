import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems:[]
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems: (state, action) => {
      const { goodsid, style } = action.payload;
      const existingItem = state.cartItems.find(
        item => item.goodsid === goodsid && item.style === style
      );

      if (existingItem) {
        // 如果已經有這個商品+樣式，增加數量
        existingItem.num += action.payload.num;
      } else {
        // 否則新增
        state.cartItems.push(action.payload);
      }
    },
    cartsub: (state, action) => {
      const { name, style } = action.payload;
      const existingItem = state.cartItems.find(item => item.name === name && item.style === style);
      if (existingItem && existingItem.num > 1) {
        existingItem.num--;
      } else {
        state.cartItems = state.cartItems.filter(item => !(item.name === name && item.style === style));
      }
    },
    cartadd: (state, action) => {
      const { name, style } = action.payload;
      const existingItem = state.cartItems.find(item => item.name === name && item.style === style);
      if (existingItem) {
        existingItem.num++;
      }
    },
    updateQuantity: (state, action) => {
      const { name, style, num } = action.payload;
      const existingItem = state.cartItems.find(item => item.name === name && item.style === style);
      if (existingItem) {
        existingItem.num = num;
      }
    },  
    removeItem: (state, action) => {
      const { name, style } = action.payload;
      state.cartItems = state.cartItems.filter(item => !(item.name === name && item.style === style));
    },

  }
});

export const {addItems,cartsub,cartadd,updateQuantity,removeItem} = cartSlice.actions;

export default cartSlice.reducer;