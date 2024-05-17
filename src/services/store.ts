/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import rootReducer from './rootReducer';

// const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

// import { configureStore } from '@reduxjs/toolkit';

// import {
//   TypedUseSelectorHook,
//   useDispatch as dispatchHook,
//   useSelector as selectorHook
// } from 'react-redux';
// import myReducer from '../slices/ingredientsSlice';

// const store = configureStore({
//   reducer: {
//     ingredients: myReducer
//   },
//   devTools: process.env.NODE_ENV !== 'production'
// });

// export type RootState = ReturnType<typeof myReducer>;

// export type AppDispatch = typeof store.dispatch;

// export const useDispatch: () => AppDispatch = () => dispatchHook();
// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// export default store;
