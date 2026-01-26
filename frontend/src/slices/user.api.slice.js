import {apiSlice} from "./api.slice.js";

const userUrl = process.env.USER_URL
export const userApiSlice = apiSlice.injectEndpoints({
   endpoints:(builder) => ({
     register: builder.mutation({
      query :(data) => ({
        url: `${UserUrl}/register`,
        method: 'post',
        body: data
       })
     })
   })
})

export const {userRegisterMutation} = userApiSlice
