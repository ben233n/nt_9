import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  shippingFee: 1200,
  total: 0,
  formData: {},
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckoutItems: (state, action) => {
      const items = action.payload;
      state.items = items;

      // 自動判斷運費
      const isSingleSubscription = items.length === 1 && items[0].mode === 2;
      state.shippingFee = isSingleSubscription ? 0 : 1200;

      // 自動計算總金額
      const productTotal = items.reduce((sum, item) => sum + item.price * (item.num || 1), 0);
      state.total = productTotal + state.shippingFee;
    },

    // 若真的需要強制修改金額，也保留這個 reducer
    setTotal: (state, action) => {
      state.total = action.payload;
    },

    // 若你從後端取得特別運費也可手動設
    setShippingFee: (state, action) => {
      state.shippingFee = action.payload;
      // 重新計算 total
      const productTotal = state.items.reduce((sum, item) => sum + item.price * (item.num || 1), 0);
      state.total = productTotal + state.shippingFee;
    },

    setCustomerInfo: (state, action) => {
      state.formData = action.payload;
    },

    resetCheckout: () => initialState,
  },
});

export const {
  setCheckoutItems,
  setTotal,
  setShippingFee,
  setCustomerInfo,
  resetCheckout
} = checkoutSlice.actions;

export default checkoutSlice.reducer;