import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import toastReducer from './toastSlice'
import storage from 'redux-persist/lib/storage'
import modelReducer from './modelSlice'
import { persistReducer,persistStore } from 'redux-persist';
import authReducer from './userSlice';

const persistConfig={
  key:'shoppingCart',
  storage,
}


const persistedCartReducer = persistReducer(persistConfig,cartReducer);
const persistedModelReducer = persistReducer(persistConfig,modelReducer);
const persistedAuthReducer = persistReducer(persistConfig,authReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    toast: toastReducer, // 新增的彈跳視窗狀態
    model:persistedModelReducer,
    auth: persistedAuthReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // 支援 thunk（可以 dispatch function）
      serializableCheck: {
        // 忽略 persist 相關的 action，不然會噴非序列化警告
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);