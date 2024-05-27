import { combineReducers } from 'redux';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { orderSlice } from './slices/orderSlice';
import { feedSlice } from './slices/feedSlice';
import { ordersSlice } from './slices/ordersSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { userSlice } from './slices/userSlice';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer
});

export default rootReducer;
