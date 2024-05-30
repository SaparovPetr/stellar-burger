import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMyOrder = createAsyncThunk(
  'order/fetchMyOrder',
  async (myOrderData: string[]) => {
    const response = await orderBurgerApi(myOrderData);
    return response;
  }
);

export const clearMyOrder = createAsyncThunk(
  'order/clearMyOrder',
  async () => null
);
