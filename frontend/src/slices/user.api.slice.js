import {apiSlice} from "./api.slice.js";

 const userUrl = '/api/user'
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //  register
    register: builder.mutation({
      query: data => ({
        url: `${userUrl}/register`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['user']
    }),

   //  logout user
   logout: builder.mutation({
    query: () => ({
      url: `${userUrl}/logout`,
      method: "POST"
    }),
    invalidatesTags: ['user']
   })
 })
})


export const {useRegisterMutation, useLogoutMutation} = userApiSlice