import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  shippingFee: 1200,
  total: 0,
  formData: {},      // 步驟2：表單內容
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckoutItems: (state, action) => {
      state.items = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setShippingFee: (state, action) => {
      state.shippingFee = action.payload;
    },
    setCustomerInfo: (state, action) => {
      state.formData = action.payload;
    },
    resetCheckout: (state) => {
      return initialState;
    }
  }
});

export const {
  setCheckoutItems,
  setTotal,
  setShippingFee,
  setCustomerInfo,
  resetCheckout
} = checkoutSlice.actions;

export default checkoutSlice.reducer;