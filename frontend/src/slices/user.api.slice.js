import {apiSlice} from "./api.slice.js";

 const userUrl = '/api/user'
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: data => ({
        url: `${userUrl}/register`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['user']
    })
  })
})


export const {useRegisterMutation} = userApiSlice