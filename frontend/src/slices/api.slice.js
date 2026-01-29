import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API,
  credentials: "include",
  prepareHeaders:(headers) => {
    if(!headers.has('Content-Type')) {
      headers.set('Content-Type' , 'application/json')
    }
    return headers
  }
})

const baseQueryWithError = async (args, api , extraOptions ) => {
  const result = await baseQuery(args,api,extraOptions)
  if(result?.error?.status === 401 ) {
    console.warn('unauthorized api')
  }
  return result
}

export const apiSlice = createApi({
  baseQuery : baseQueryWithError,
  tagTypes: ['user'],
  endpoints: (builder) => ({})
})