import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-ticket-assigning-tool.onrender.com/api/',
  }),
  tagTypes: ['Customer'],
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => 'customers',
      providesTags: ['Customer'],
    }),
    getCustomer: builder.query({
      query: (id) => `customers/${id}`,
      providesTags: (result, error, id) => [{ type: 'Customer', id }],
    }),
    addCustomer: builder.mutation({
      query: (customer) => ({
        url: 'customers',
        method: 'POST',
        body: customer,
      }),
      invalidatesTags: ['Customer'],
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...customer }) => ({
        url: `customers/${id}`,
        method: 'PUT',
        body: customer,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Customer', id }],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
} = customerApi;