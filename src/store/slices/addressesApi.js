import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const addressesApi = createApi({
  reducerPath: 'addressesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Address'],
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => '',
      providesTags: ['Address'],
    }),
    addAddress: builder.mutation({
      query: (data) => ({ url: '', method: 'POST', body: data }),
      invalidatesTags: ['Address'],
    }),
    editAddress: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Address'],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Address'],
    }),
    selectAddress: builder.mutation({
      query: (id) => ({ url: `/${id}/select`, method: 'PATCH' }),
      invalidatesTags: ['Address'],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useEditAddressMutation,
  useDeleteAddressMutation,
  useSelectAddressMutation,
} = addressesApi;
