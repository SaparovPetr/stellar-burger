/* eslint-disable prettier/prettier */
import { Route, Routes, useLocation } from 'react-router-dom';
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
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/thunks/fetchIngredients';
import { checkhUserAuth, loginUser } from '../../services/thunks/fetchUserAuth';

import { fetchFeed } from '../../services/thunks/fetchFeed';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { selectIsLoading } from '../../services/slices/ingredientsSlice';

import { RequestStatus } from '@utils-types';
import { selectOnlyOneOrder } from '../../services/slices/orderSlice';
import ProtectedRoute from '../protected-route/protected-route';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isLoading = useAppSelector(selectIsLoading);

  const backgroundLocation = location.state?.background;

  const orderNumber = useAppSelector(selectOnlyOneOrder);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkhUserAuth());
  }, [dispatch]);

  return (
    <div className='thisApp'>
      <AppHeader />
      {isLoading === RequestStatus.Success && (
        <div>
          <Routes location={backgroundLocation || location}>
            {/* страницы без защиты: */}
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='*' element={<NotFound404 />} />
            {/* защитить страницы: */}
            <Route
              path='/login'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Login />
                </ProtectedRoute>
              }
            />

            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path='/register'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
          </Routes>

          {backgroundLocation && (
            <Routes>
              <Route
                path='/feed/:number'
                element={
                  <Modal
                    title={`Заказ #${orderNumber?.number}`}
                    onClose={function (): void {}}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title={''} onClose={function (): void {}}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute>
                    <Modal title={''} onClose={function (): void {}}>
                      <OrderInfo />
                    </Modal>
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </div>
      )}
    </div>
  );
};
export default App;

//  {/* <Route path='/' element={<ProtectedRoute accessRoles={[ROLE.USER, ROLE.ADMIN]} ><Home /></ProtectedRoute>} /> */}
