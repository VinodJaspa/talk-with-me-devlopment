import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


import logger from 'redux-logger'
import userSlice  from "./userauth";

const reducers = combineReducers({
 
  userInfo: userSlice
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  // preloadedState,
  // enhancers: [batchedSubscribe(debounceNotify)],
})


export const persistor = persistStore(store);