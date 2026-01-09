import { configureStore } from '@reduxjs/toolkit';
import { customerApi } from './slices/customerApi';
import { authApi } from './slices/authApi';
import { ticketsApi } from './slices/ticketsApi';

export const store = configureStore({
  reducer: {
    [customerApi.reducerPath]: customerApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(customerApi.middleware)
      .concat(authApi.middleware)
      .concat(ticketsApi.middleware),
});

export default store;