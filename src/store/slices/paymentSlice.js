import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { updateLocalSubscription } from './subscriptionSlice';

// Create Razorpay Order
export const createPaymentOrder = createAsyncThunk(
  'payment/createPaymentOrder',
  async (planId, { rejectWithValue }) => {
    try {
      const response = await api.post('/payments/create-order', { planId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to initiate order');
    }
  }
);

// Verify Signature
export const verifyPaymentSignature = createAsyncThunk(
  'payment/verifyPaymentSignature',
  async (paymentData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/payments/verify', paymentData);
      if (response.data.success && response.data.payment?.subscriptionId) {
        // Fetch/update subscription in local state immediately
        dispatch(updateLocalSubscription(response.data.payment.subscriptionId));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signature verification failed');
    }
  }
);

// Cancel Active Subscription
export const cancelSubscription = createAsyncThunk(
  'payment/cancelSubscription',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/payments/cancel');
      if (response.data.success) {
        dispatch(updateLocalSubscription(response.data.subscription));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel subscription');
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    orderData: null,
    verificationStatus: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
    loading: false,
    cancelLoading: false,
    error: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.orderData = null;
      state.verificationStatus = 'idle';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Payment Order
      .addCase(createPaymentOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify Payment Signature
      .addCase(verifyPaymentSignature.pending, (state) => {
        state.verificationStatus = 'loading';
        state.error = null;
      })
      .addCase(verifyPaymentSignature.fulfilled, (state) => {
        state.verificationStatus = 'success';
      })
      .addCase(verifyPaymentSignature.rejected, (state, action) => {
        state.verificationStatus = 'failed';
        state.error = action.payload;
      })
      // Cancel Subscription
      .addCase(cancelSubscription.pending, (state) => {
        state.cancelLoading = true;
      })
      .addCase(cancelSubscription.fulfilled, (state) => {
        state.cancelLoading = false;
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.cancelLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
