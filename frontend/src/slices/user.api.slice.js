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
   }),

 // login
     login: builder.mutation({
      query: (data) => ({
        url: `${userUrl}/logout`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ['user']
    }),

     //    profile get
    getProfile: builder.query({
      query: () => ({
        url: `${userUrl}/profile`,
        method:"Get"
      }),
      providesTags: ['user']
    }),

     //   update profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${userUrl}/profile`,
        method: "put",
        body: data
      })
      invalidatesTags: ['user']
    })
 })
})


export const {
   useRegisterMutation,
  useLogoutMutation ,
  useLoginMutation ,
  useGetProfileQuery,
  useUpdateProfileMutation
} = userApiSlice