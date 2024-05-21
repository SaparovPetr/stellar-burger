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
import { useAppDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/thunks/fetchIngredients';
import { fetchFeed } from 'src/services/thunks/fetchFeed';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
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
            <Modal title={''} onClose={function (): void {}}>
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

        {/* защитить модалки: */}
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title={''} onClose={function (): void {}}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path='/' element={<ConstructorPage />} />

          <Route
            path='/ingredients/:id'
            element={
              <Modal title={''} onClose={function (): void {}}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;

//  {/* <Route path='/' element={<ProtectedRoute accessRoles={[ROLE.USER, ROLE.ADMIN]} ><Home /></ProtectedRoute>} /> */}
