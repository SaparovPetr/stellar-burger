/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalTooday: number;
  status: RequestStatus;
}

const initialStateForOrders: FeedState = {
  orders: [],
  total: 0,
  totalTooday: 0,
  status: RequestStatus.Idle
};

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState: initialStateForOrders,
  reducers: {},
  selectors: {},
  extraReducers: (builder) => {}
});

export const {} = feedSlice.selectors;

// export default feedSlice.reducer;
