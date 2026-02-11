import {apiSlice} from "./api.slice.js";

const userUrl = 'api/user'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // Register
    register: builder.mutation({
      query: data => ({
        url: `${userUrl}/register`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['User']
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: `${userUrl}/logout`,
        method: "POST",
      }),
      invalidatesTags: ['User']  // ✅ ছোট হাতের 'i' ছিল
    }),

    // Login
    login: builder.mutation({
      query: data => ({
        url: `${userUrl}/login`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['User']
    }),

    // Get Profile
    profile: builder.query({  // ✅ mutation না, query হবে
      query: () => ({
        url: `${userUrl}/profile`,
        method: 'GET'
      }),
      providesTags: ['User']
    }),

    // Update Profile (Name & Email)
    updateProfile: builder.mutation({
      query: data => ({
        url: `${userUrl}/profile`,  // ✅ '/profile' হবে, '/updateProfile' না
        method: 'PUT',  // ✅ PUT method হবে
        body: data
      }),
      invalidatesTags: ['User']
    }),

    // Update Password
    updatePassword: builder.mutation({
      query: data => ({
        url: `${userUrl}/password`,  // ✅ নতুন endpoint
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User']
    })
  })
})

export const {
  useRegisterMutation,
  useLogoutMutation,
  useLoginMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation
} = userApiSlice