import {apiSlice} from "./api.slice.js";

const userUrl = '/api/user'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // register
    register: builder.mutation({
      query: data => ({
        url: `${userUrl}/register`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['user']
    }),

    // logout user
    logout: builder.mutation({
      query: () => ({
        url: `${userUrl}/logout`,
        method: "POST"
      }),
      invalidatesTags: ['user']
    }),

    // login - ✅ URL ঠিক করা হয়েছে
    login: builder.mutation({
      query: (data) => ({
        url: `${userUrl}/login`,  // ✅ এখন সঠিক
        method: "POST",
        body: data
      }),
      invalidatesTags: ['user']
    }),

    // profile get
    getProfile: builder.query({
      query: () => ({
        url: `${userUrl}/profile`,
        method: "GET"
      }),
      providesTags: ['user']
    }),

    // update profile - ✅ comma যোগ করা হয়েছে
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${userUrl}/profile`,
        method: "PUT",
        body: data
      }),  // ✅ এখন comma আছে
      invalidatesTags: ['user']
    })

  })
})

export const {
  useRegisterMutation,
  useLogoutMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation
} = userApiSlice