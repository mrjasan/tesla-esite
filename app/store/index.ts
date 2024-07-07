// store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import siteConfigReducer from './siteConfigSlice';
import siteCollectionReducer from  './siteCollectionSlice';

const rootReducer = combineReducers({
  siteConfig: siteConfigReducer,
  siteCollection: siteCollectionReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['siteConfig','siteCollection'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  }
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
