import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '../../../utils/types';
import { fetchmyOrderList } from '../../thunks/fetchmyOrderList';

export interface CustomersOrdersState {
  orders: TOrder[];
  status: RequestStatus;
  error: null | string;
}

export const initialStateForCustomersOrders: CustomersOrdersState = {
  orders: [],
  status: RequestStatus.Idle,
  error: null
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
      state.status = RequestStatus.Success;
    });
    builder.addCase(fetchmyOrderList.rejected, (state, action) => {
      state.status = RequestStatus.Failed;
      state.error = 'ошибка получения списка заказов пользователя';
    });
  }
});

export const { selectMyOrderList } = ordersSlice.selectors;
