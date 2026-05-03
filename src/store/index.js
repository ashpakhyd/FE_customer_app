import { configureStore } from '@reduxjs/toolkit';
import { customerApi } from './slices/customerApi';
import { authApi } from './slices/authApi';
import { ticketsApi } from './slices/ticketsApi';
import { offersApi } from './slices/offersApi';
import { addressesApi } from './slices/addressesApi';

export const store = configureStore({
  reducer: {
    [customerApi.reducerPath]: customerApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
    [offersApi.reducerPath]: offersApi.reducer,
    [addressesApi.reducerPath]: addressesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(customerApi.middleware)
      .concat(authApi.middleware)
      .concat(ticketsApi.middleware)
      .concat(offersApi.middleware)
      .concat(addressesApi.middleware),
});

export default store;
