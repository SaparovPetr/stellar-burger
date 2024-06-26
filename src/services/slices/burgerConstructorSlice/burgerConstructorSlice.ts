import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { clearMyOrder, fetchMyOrder } from '../../thunks/fetchMyOrder';
const uuid = require('uuid');

interface TBurgerConstructor {
  bun: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  ingredients: TConstructorIngredient[];
}

export interface BurgerConstructorState {
  constructorItems: TBurgerConstructor;
  orderRequest: boolean;
  orderModalData: null | any;
  arrayForOrder: string[];
}

const initialStateForConstructor: BurgerConstructorState = {
  constructorItems: {
    bun: {
      _id: '',
      name: 'Выберите булку',
      price: 0,
      image: 'https://www.svgrepo.com/show/404711/alien.svg'
    },
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  arrayForOrder: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructorSlice',
  initialState: initialStateForConstructor,
  reducers: {
    setConstuctorItems: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        }

        if (action.payload.type !== 'bun') {
          state.constructorItems.ingredients.push(action.payload);
        }
      },

      prepare: (ingredient: TConstructorIngredient) => ({
        payload: { ...ingredient, id: uuid.v4() }
      })
    },

    removeConstuctorItems(state, action) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredientForDelete: TConstructorIngredient) =>
            ingredientForDelete.id !== action.payload.id
        );
    },
    setArreyForOrder(state, action) {
      state.arrayForOrder = [];

      const idListFromConstructorItemsIngredients: string[] = [];
      state.constructorItems.ingredients.forEach((item) => {
        idListFromConstructorItemsIngredients.push(item._id);
        return idListFromConstructorItemsIngredients;
      });

      const bunsArrey: string[] = [];
      bunsArrey.push(state.constructorItems.bun._id);
      const ingredientsArrey = idListFromConstructorItemsIngredients.flat();
      const allIngredients = bunsArrey.concat(ingredientsArrey);

      state.arrayForOrder = allIngredients;
      state.arrayForOrder.push(state.arrayForOrder[0]);
    },

    increseIndex(state, action) {
      const ingredientIndex = action.payload;
      if (ingredientIndex > 0) {
        const temp = state.constructorItems.ingredients[ingredientIndex];
        state.constructorItems.ingredients[ingredientIndex] =
          state.constructorItems.ingredients[ingredientIndex - 1];
        state.constructorItems.ingredients[ingredientIndex - 1] = temp;
      }
    },
    decreseIndex(state, action) {
      const ingredientIndex = action.payload;
      if (ingredientIndex < state.constructorItems.ingredients.length - 1) {
        const temp = state.constructorItems.ingredients[ingredientIndex];
        state.constructorItems.ingredients[ingredientIndex] =
          state.constructorItems.ingredients[ingredientIndex + 1];
        state.constructorItems.ingredients[ingredientIndex + 1] = temp;
      }
    },

    setOrderRequest(state, action) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action) {
      state.orderModalData = action.payload;
    }
  },
  selectors: {
    selectConstuctorItems: (sliceState) => sliceState.constructorItems,
    selectOrderRequest: (sliceState) => sliceState.orderRequest,
    selectOrderModalData: (sliceState) => sliceState.orderModalData,
    selectArray: (sliceState) => sliceState.arrayForOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchMyOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = {
          number: action.payload.order.number
        };
      })
      .addCase(clearMyOrder.fulfilled, () => initialStateForConstructor);
  }
});

export const {
  selectConstuctorItems,
  selectOrderRequest,
  selectOrderModalData,
  selectArray
} = burgerConstructorSlice.selectors;

export const {
  setConstuctorItems,
  removeConstuctorItems,
  setArreyForOrder,
  increseIndex,
  decreseIndex
} = burgerConstructorSlice.actions;
