import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loaderSlice from "./slices/loaderSlice";
import userSlice from "./slices/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const combinedReducers = combineReducers({
  user: userSlice,
  loader: loaderSlice,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: {
    reducer: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
});

export default store;
