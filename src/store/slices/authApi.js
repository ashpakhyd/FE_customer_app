import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-ticket-assigning-tool.onrender.com/api/auth/',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: 'register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    sendOtp: builder.mutation({
      query: (phone) => ({
        url: 'send-otp',
        method: 'POST',
        body: phone,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: 'verify-otp',
        method: 'POST',
        body: otpData,
      }),
    }),
    getProfile: builder.query({
      query: () => 'me',
      providesTags: ['Auth'],
    }),
    forgotPassword: builder.mutation({
      query: (phone) => ({
        url: 'forgot-password',
        method: 'POST',
        body: phone,
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: 'reset-password',
        method: 'POST',
        body: resetData,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useGetProfileQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;