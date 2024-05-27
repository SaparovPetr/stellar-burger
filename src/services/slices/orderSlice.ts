// orderSlice.ts
// это срез текущего заказа модального окна - процесса создания одного заказа

import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { fetchOrder } from '../thunks/fetchOrder';
import { useParams } from 'react-router-dom';

// изменить типизацию
interface OrderState {
  orders: TOrder[];
  status: boolean | null;
}

const initialStateForOrder: OrderState = {
  orders: [],
  status: null
};

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: initialStateForOrder,
  reducers: {},
  selectors: {
    selectOnlyOneOrder: (sliceState) => sliceState.orders[0],
    // selectStatusOfPrepairing: (sliceState) => sliceState.orders[0]._id,
    selectStatus: (sliceState) => sliceState.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        // state.status = RequestStatus.Loading;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        // state.status = RequestStatus.Success;
        state.orders = action.payload.orders;
        // state.status = action.payload.success;
        // console.log(action.payload.orders[0].ingredients);
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        // state.status = RequestStatus.Failed;
        // state.error = action.error.message || null;
      });
  }
});

export const { selectOnlyOneOrder, selectStatus } = orderSlice.selectors;

// export default orderSlice.reducer;
