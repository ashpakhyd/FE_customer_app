import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const offersApi = createApi({
  reducerPath: 'offersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/offers`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Offers'],
  endpoints: (builder) => ({
    getOffers: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.type) queryParams.append('type', params.type);
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.category) queryParams.append('category', params.category);
        if (params.search) queryParams.append('search', params.search);
        return `?${queryParams.toString()}`;
      },
      providesTags: ['Offers'],
    }),
    getOfferById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ['Offers'],
    }),
    redeemOffer: builder.mutation({
      query: (id) => ({
        url: `/${id}/action`,
        method: 'POST',
        body: { action: 'REDEEM' },
      }),
      invalidatesTags: ['Offers'],
    }),
    likeOffer: builder.mutation({
      query: (id) => ({
        url: `/${id}/action`,
        method: 'POST',
        body: { action: 'LIKE' },
      }),
    }),
  }),
});

export const {
  useGetOffersQuery,
  useGetOfferByIdQuery,
  useRedeemOfferMutation,
  useLikeOfferMutation,
} = offersApi;
