/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { orderSlice } from './slices/orderSlice';
import { feedSlice } from './slices/feedSlice';
import { ordersSlice } from './slices/ordersSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer
});

export default rootReducer;
