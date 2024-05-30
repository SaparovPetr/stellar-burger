import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { fetchmyOrderList } from '../thunks/fetchmyOrderList';

interface CustomersOrdersState {
  orders: TOrder[];
  status: RequestStatus;
}

const initialStateForCustomersOrders: CustomersOrdersState = {
  orders: [],
  status: RequestStatus.Idle
};

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState: initialStateForCustomersOrders,
  reducers: {},
  selectors: {
    selectMyOrderList: (sliceState) => sliceState.orders
  },
  extraReducers: (builder) => {
    builder.addCase(fetchmyOrderList.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const { selectMyOrderList } = ordersSlice.selectors;
