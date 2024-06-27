import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';
import { fetchIngredients } from '../thunks/fetchIngredients';
import { useParams } from 'react-router-dom';

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
    selectOneIngredient: (sliceState) => {
      const IDfromURL = useParams();
      const findObjectById = (id: string | undefined) =>
        sliceState.ingredients.find((obj) => obj._id === id);
      return findObjectById(IDfromURL.id);
    },
    selectIngredients: (sliceState) => sliceState.ingredients,
    selectIsLoading: (sliceState) => sliceState.requestStatus
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

export const { selectOneIngredient, selectIngredients, selectIsLoading } =
  ingredientsSlice.selectors;
