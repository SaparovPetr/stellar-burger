import { combineReducers } from 'redux';
import { ingredientsSlice } from './slices/ingredientsSlice/ingredientsSlice';
import { orderSlice } from './slices/orderSlice/orderSlice';
import { feedSlice } from './slices/feedSlice/feedSlice';
import { ordersSlice } from './slices/ordersSlice/ordersSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice/burgerConstructorSlice';
import { userSlice } from './slices/userSlice/userSlice';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer
});

export default rootReducer;
