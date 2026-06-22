import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Fetch all subscription plans
export const fetchPlans = createAsyncThunk(
  'subscription/fetchPlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/plans');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch plans');
    }
  }
);

// Fetch active subscription for the current user
export const fetchCurrentSubscription = createAsyncThunk(
  'subscription/fetchCurrentSubscription',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/subscriptions/current');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'No active subscription');
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    plans: [],
    currentSubscription: null,
    loading: false,
    plansLoading: false,
    error: null,
    plansError: null,
  },
  reducers: {
    clearSubscriptionError: (state) => {
      state.error = null;
    },
    updateLocalSubscription: (state, action) => {
      state.currentSubscription = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Plans
      .addCase(fetchPlans.pending, (state) => {
        state.plansLoading = true;
        state.plansError = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.plansLoading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.plansLoading = false;
        state.plansError = action.payload;
      })
      // Fetch Current Subscription
      .addCase(fetchCurrentSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubscription = action.payload;
      })
      .addCase(fetchCurrentSubscription.rejected, (state, action) => {
        state.loading = false;
        state.currentSubscription = null; // Reset if none
        state.error = action.payload;
      });
  },
});

export const { clearSubscriptionError, updateLocalSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
