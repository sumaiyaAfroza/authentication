import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../src/slices/api.slice.js";
import {authSlice} from "../src/slices/auth.slice.js";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})