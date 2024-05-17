/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import { Route, Routes } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/thunks/fetchIngredients';
import { setConstuctorItems } from '../../services/slices/burgerConstructorSlice';

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(setConstuctorItems());
  // }, [dispatch]);

  // console.log(ingredients)

  return (
    <>
      <AppHeader />
      <Routes>
        {/* страницы без защиты: */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        {/* защитить страницы: */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />

        {/* модалки без защиты: */}
        <Route
          path='/feed/:number'
          element={
            <Modal
              title={''}
              onClose={function (): void {
                throw new Error('Function not implemented.');
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title={''}
              onClose={function (): void {
                throw new Error('Function not implemented.');
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />

        {/* защитить модалки: */}
        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title={''}
              onClose={function (): void {
                throw new Error('Function not implemented.');
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </>
  );
};

export default App;

//  {/* <Route path='/' element={<ProtectedRoute accessRoles={[ROLE.USER, ROLE.ADMIN]} ><Home /></ProtectedRoute>} /> */}
