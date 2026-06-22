import { configureStore } from '@reduxjs/toolkit';
import subscriptionReducer from './slices/subscriptionSlice';
import paymentReducer from './slices/paymentSlice';
import billingReducer from './slices/billingSlice';

export const store = configureStore({
  reducer: {
    subscription: subscriptionReducer,
    payment: paymentReducer,
    billing: billingReducer,
  },
});

export default store;
