import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../slice/api.slice.js";
import {authSlice} from "../slice/auth.slice.js";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath] : apiSlice.reducer,
    auth : authSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})