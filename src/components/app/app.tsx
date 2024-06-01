/* eslint-disable prettier/prettier */
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import { checkhUserAuth } from '../../services/thunks/fetchUserAuth';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { selectIsLoading } from '../../services/slices/ingredientsSlice';

import { RequestStatus } from '@utils-types';
import { selectOnlyOneOrder } from '../../services/slices/orderSlice';
import ProtectedRoute from '../protected-route/protected-route';

const App = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const navigate = useNavigate();

  const location = useLocation();
  const backgroundLocation = location.state?.background;

  const orderNumber = useAppSelector(selectOnlyOneOrder);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkhUserAuth());
  }, [dispatch]);

  const onClose = () => {
    navigate(-1);
  };

  return (
    <div className='thisApp'>
      <AppHeader />
      {isLoading === RequestStatus.Success && (
        <div>
          <Routes location={backgroundLocation || location}>
            <Route path='/stellar-burger/' element={<ConstructorPage />} />
            <Route path='/stellar-burger/feed' element={<Feed />} />
            <Route path='*' element={<NotFound404 />} />
            <Route
              path='/stellar-burger/login'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Login />
                </ProtectedRoute>
              }
            />

            <Route
              path='/stellar-burger/ingredients/:id'
              element={
                <Modal
                  title={'Ингредиент'}
                  onClose={(): void => navigate('/stellar-burger/')}
                >
                  <IngredientDetails />
                </Modal>
              }
            />

            <Route
              path='/stellar-burger/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path='/stellar-burger/register'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/stellar-burger/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/stellar-burger/reset-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/stellar-burger/profile/orders'
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
                path='/stellar-burger/feed/:number'
                element={
                  <Modal
                    title={`Заказ #${orderNumber?.number}`}
                    onClose={onClose}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/stellar-burger/ingredients/:id'
                element={
                  <Modal title={''} onClose={onClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/stellar-burger/profile/orders/:number'
                element={
                  <ProtectedRoute>
                    <Modal title={`#${orderNumber?.number}`} onClose={onClose}>
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
