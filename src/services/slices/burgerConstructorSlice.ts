import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface TBurgerConstructor {
  bun: {
    _id: string;
    name: string;
    price: number;
    image: any;
  };
  ingredients: TConstructorIngredient[];
}

interface BurgerConstructorState {
  constructorItems: TBurgerConstructor;
  orderRequest: boolean;
  orderModalData: null;
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
  orderModalData: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructorSlice',
  initialState: initialStateForConstructor,
  reducers: {
    setConstuctorItems(state, action) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      }
      if (action.payload.type !== 'bun') {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    removeConstuctorItems(state, action) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredientForDelete) =>
            ingredientForDelete._id !== action.payload._id
        );
    },

    /**  TODO: 🔴 разработать перемещение на основе action.payload*/
    increseIndex(state, action) {
      [
        state.constructorItems.ingredients[0],
        state.constructorItems.ingredients[1]
      ] = [
        state.constructorItems.ingredients[1],
        state.constructorItems.ingredients[0]
      ];
    },
    decreseIndex(state, action) {
      [
        state.constructorItems.ingredients[1],
        state.constructorItems.ingredients[0]
      ] = [
        state.constructorItems.ingredients[0],
        state.constructorItems.ingredients[1]
      ];
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
    selectOrderModalData: (sliceState) => sliceState.orderModalData
  },
  extraReducers: () => {}
});

export const {
  selectConstuctorItems,
  selectOrderRequest,
  selectOrderModalData
} = burgerConstructorSlice.selectors;

export const {
  setConstuctorItems,
  removeConstuctorItems,
  increseIndex,
  decreseIndex
} = burgerConstructorSlice.actions;

// export const setConstuctorItems = burgerConstructorSlice.reducer;
