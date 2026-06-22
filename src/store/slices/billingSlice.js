import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Fetch Payment History
export const fetchPaymentHistory = createAsyncThunk(
  'billing/fetchPaymentHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/payments/history');
      return response.data.payments;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch billing history');
    }
  }
);

// Fetch Invoice Metadata
export const fetchInvoice = createAsyncThunk(
  'billing/fetchInvoice',
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/payments/invoice/${paymentId}`);
      return response.data.invoice;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch invoice details');
    }
  }
);

// Admin: Fetch All Payments
export const fetchAdminPayments = createAsyncThunk(
  'billing/fetchAdminPayments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/payments');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch administrative payment list');
    }
  }
);

// Admin: Fetch All Subscriptions
export const fetchAdminSubscriptions = createAsyncThunk(
  'billing/fetchAdminSubscriptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/subscriptions');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch administrative subscriptions');
    }
  }
);

const billingSlice = createSlice({
  name: 'billing',
  initialState: {
    history: [],
    invoice: null,
    adminPayments: [],
    adminSubscriptions: [],
    loading: false,
    invoiceLoading: false,
    adminLoading: false,
    error: null,
  },
  reducers: {
    clearInvoice: (state) => {
      state.invoice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Payment History
      .addCase(fetchPaymentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Invoice
      .addCase(fetchInvoice.pending, (state) => {
        state.invoiceLoading = true;
        state.error = null;
      })
      .addCase(fetchInvoice.fulfilled, (state, action) => {
        state.invoiceLoading = false;
        state.invoice = action.payload;
      })
      .addCase(fetchInvoice.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.error = action.payload;
      })
      // Admin: Fetch Payments
      .addCase(fetchAdminPayments.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(fetchAdminPayments.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminPayments = action.payload;
      })
      .addCase(fetchAdminPayments.rejected, (state, action) => {
        state.adminLoading = false;
        state.error = action.payload;
      })
      // Admin: Fetch Subscriptions
      .addCase(fetchAdminSubscriptions.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(fetchAdminSubscriptions.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSubscriptions = action.payload;
      })
      .addCase(fetchAdminSubscriptions.rejected, (state, action) => {
        state.adminLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearInvoice } = billingSlice.actions;
export default billingSlice.reducer;
