import { getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchmyOrderList = createAsyncThunk(
  'orders/fetchmyOrderList',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);
