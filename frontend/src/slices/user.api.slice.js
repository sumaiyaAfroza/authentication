import {apiSlice} from "./api.slice.js";

 const userUrl = process.env.USER_URL
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: data => ({
        url: `${userUrl}/register`,
        method: 'POST',
        body: data
      })
    })
  })
})


export const {useRegisterMutation} = userApiSlice