import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrder } from '../thunks/fetchOrder';

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
    selectStatus: (sliceState) => sliceState.status
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
    });
  }
});

export const { selectOnlyOneOrder, selectStatus } = orderSlice.selectors;
