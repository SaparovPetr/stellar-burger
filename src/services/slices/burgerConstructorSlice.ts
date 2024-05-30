import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { clearMyOrder, fetchMyOrder } from '../thunks/fetchMyOrder';

const blueBun = '643d69a5c3f7b9001cfa093c';
const pinkBun = '643d69a5c3f7b9001cfa093d';

interface TBurgerConstructor {
  bun: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  ingredients: TConstructorIngredient[];
}

interface BurgerConstructorState {
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
    setConstuctorItems(state, action) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;

        if (state.constructorItems.bun._id === pinkBun) {
          state.arrayForOrder.push(pinkBun);
          state.arrayForOrder.push(pinkBun);
          state.arrayForOrder = state.arrayForOrder.filter(function (
            item: any
          ) {
            return item !== blueBun;
          });
        }

        if (state.constructorItems.bun._id === blueBun) {
          state.arrayForOrder.push(blueBun);
          state.arrayForOrder.push(blueBun);
          state.arrayForOrder = state.arrayForOrder.filter(function (
            item: any
          ) {
            return item !== pinkBun;
          });
        }

        const dublicateBlue = state.arrayForOrder.some(function (item: any) {
          return item === blueBun;
        });
        if (dublicateBlue && state.constructorItems.bun._id === blueBun) {
          state.arrayForOrder.push(state.constructorItems.bun._id);
          state.arrayForOrder = state.arrayForOrder.filter(function (
            item: any
          ) {
            return item !== blueBun;
          });
          state.arrayForOrder.push(blueBun);
          state.arrayForOrder.push(blueBun);
        }

        const dublicatePink = state.arrayForOrder.some(function (item: any) {
          return item === pinkBun;
        });
        if (dublicatePink && state.constructorItems.bun._id === pinkBun) {
          state.arrayForOrder.push(state.constructorItems.bun._id);
          state.arrayForOrder = state.arrayForOrder.filter(function (
            item: any
          ) {
            return item !== pinkBun;
          });
          state.arrayForOrder.push(pinkBun);
          state.arrayForOrder.push(pinkBun);
        }
      }

      if (action.payload.type !== 'bun') {
        state.constructorItems.ingredients.push(action.payload);
        state.arrayForOrder.push(action.payload._id);
      }
    },
    removeConstuctorItems(state, action) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredientForDelete) =>
            ingredientForDelete._id !== action.payload._id
        );
      state.arrayForOrder = state.arrayForOrder.filter(
        (ingredientForDelete: any) => ingredientForDelete !== action.payload._id
      );
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
  increseIndex,
  decreseIndex
} = burgerConstructorSlice.actions;
