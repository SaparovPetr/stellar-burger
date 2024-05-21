import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFeed = createAsyncThunk('feed/fetchIngredients', async () => {
  const response = await getFeedsApi();
  return response;
});
