import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrder = createAsyncThunk(
  'feed/fetchOrder',
  async (orderNumber: string | number) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response;
  }
);
