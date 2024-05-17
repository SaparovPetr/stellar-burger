// orderSlice.ts
// это срез текущего заказа модального окна - процесса создания одного заказа

/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@utils-types';

// изменить типизацию
interface OrderState {
  info: any;
  status: RequestStatus;
}

const initialStateForOrder: OrderState = {
  info: null,
  status: RequestStatus.Idle
};

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: initialStateForOrder,
  reducers: {},
  selectors: {},
  extraReducers: (builder) => {}
});

export const {} = orderSlice.selectors;

// export default orderSlice.reducer;
