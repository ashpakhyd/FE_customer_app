import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ticketsApi = createApi({
  reducerPath: 'ticketsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-ticket-assigning-tool.onrender.com/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Ticket', 'Comment', 'Rating', 'Notification'],
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: (ticketData) => ({
        url: 'tickets',
        method: 'POST',
        body: ticketData,
      }),
      invalidatesTags: ['Ticket'],
    }),
    getMyTickets: builder.query({
      query: () => 'tickets/customer/my',
      providesTags: ['Ticket'],
    }),
    getTicket: builder.query({
      query: (id) => `tickets/${id}`,
      providesTags: (result, error, id) => [{ type: 'Ticket', id }],
    }),
    addComment: builder.mutation({
      query: ({ id, message }) => ({
        url: `comments/${id}/comment`,
        method: 'POST',
        body: { message },
      }),
      invalidatesTags: ['Comment'],
    }),
    uploadAttachment: builder.mutation({
      query: ({ id, formData }) => ({
        url: `comments/${id}/attachment`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Comment'],
    }),
    getComments: builder.query({
      query: (id) => `comments/${id}/comments`,
      providesTags: ['Comment'],
    }),
    rateTechnician: builder.mutation({
      query: ({ id, rating, feedback }) => ({
        url: `ratings/tickets/${id}/rate`,
        method: 'POST',
        body: { rating, feedback },
      }),
      invalidatesTags: ['Rating'],
    }),
    getMyRatings: builder.query({
      query: () => 'ratings/customer/ratings',
      providesTags: ['Rating'],
    }),
    getNotifications: builder.query({
      query: () => 'notifications',
      providesTags: ['Notification'],
    }),
    markNotificationRead: builder.mutation({
      query: (id) => ({
        url: `notifications/${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetMyTicketsQuery,
  useGetTicketQuery,
  useAddCommentMutation,
  useUploadAttachmentMutation,
  useGetCommentsQuery,
  useRateTechnicianMutation,
  useGetMyRatingsQuery,
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} = ticketsApi;