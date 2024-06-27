import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { clearFeed, fetchFeed } from '../thunks/fetchFeed';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalTooday: number;
  status: RequestStatus;
  error: string | null;
}

const initialStateForOrders: FeedState = {
  orders: [],
  total: 0,
  totalTooday: 0,
  status: RequestStatus.Idle,
  error: null
};

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState: initialStateForOrders,
  reducers: {},
  selectors: {
    selectOrders: (sliceState) => sliceState.orders,
    selectTotal: (sliceState) => sliceState.total,
    selectTotalToday: (sliceState) => sliceState.totalTooday,
    selectStatus: (sliceState) => sliceState.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalTooday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message || null;
      })
      .addCase(clearFeed.fulfilled, () => initialStateForOrders);
  }
});

export const { selectOrders, selectTotal, selectTotalToday, selectStatus } =
  feedSlice.selectors;
