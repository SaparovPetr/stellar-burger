/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */

// ingredientsSlice.ts
import { getIngredientsApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';
// import { RequestStatus } from "../../types";
import { fetchIngredients } from '../thunks/fetchIngredients';

interface ConstructorPageState {
  ingredients: TIngredient[];
  requestStatus: RequestStatus;
}

const initialStateForAllIngredients: ConstructorPageState = {
  ingredients: [],
  requestStatus: RequestStatus.Idle
};

export const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState: initialStateForAllIngredients,
  reducers: {},
  selectors: {
    selectIngredients: (sliceState) => {
      return sliceState.ingredients;
    },
    selectIsLoading: (sliceState) => {
      return sliceState.requestStatus;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const { selectIngredients, selectIsLoading } =
  ingredientsSlice.selectors;

// export const { toggleLike } = ingredientsSlice.actions;
// export default ingredientsSlice.reducer;
