// для вывода списка заказов пользователя

import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

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
  selectors: {},
  extraReducers: (builder) => {}
});

export const {} = ordersSlice.selectors;

// export default ordersSlice.reducer;
