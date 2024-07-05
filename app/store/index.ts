import { configureStore } from '@reduxjs/toolkit';
import siteConfigReducer from './siteConfigSlice';

const store = configureStore({
  reducer: {
    siteConfig: siteConfigReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;