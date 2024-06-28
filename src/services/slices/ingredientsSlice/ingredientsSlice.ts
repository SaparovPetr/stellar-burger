import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '../../../utils/types';
import { fetchIngredients } from '../../thunks/fetchIngredients';
import { useParams } from 'react-router-dom';

export interface ConstructorPageState {
  ingredients: TIngredient[];
  requestStatus: RequestStatus;
  error: string | null;
}

export const initialStateForAllIngredients: ConstructorPageState = {
  ingredients: [],
  requestStatus: RequestStatus.Idle,
  error: null
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
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.ingredients = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
        state.error = action.error.message || 'ошибка получения ингредиентов';
      });
  }
});

export const { selectOneIngredient, selectIngredients, selectIsLoading } =
  ingredientsSlice.selectors;
