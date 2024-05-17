/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface TBurgerConstructor {
  bun: {
    name: string,
    price: number;
    image: any
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
      name: 'выбирете булку',
      price: 0,
      image: "https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg"
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
        state.constructorItems.bun  = action.payload;
      }
      if (action.payload.type !== 'bun') {
        state.constructorItems.ingredients.push(action.payload);
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
    // eslint-disable-next-line arrow-body-style
    selectConstuctorItems: (sliceState) => {
      return sliceState.constructorItems;
    },
    selectOrderRequest: (sliceState) => {
      return sliceState.orderRequest;
    },
    selectOrderModalData: (sliceState) => {
      return sliceState.orderModalData;
    }
  },
  extraReducers: () => {}
});

export const {
  selectConstuctorItems,
  selectOrderRequest,
  selectOrderModalData
} = burgerConstructorSlice.selectors;

export const { setConstuctorItems } = burgerConstructorSlice.actions;

// export const setConstuctorItems = burgerConstructorSlice.reducer;
