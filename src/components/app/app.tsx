/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import { Route, Routes } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';

const App = () => {

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
      //  {/* защитить: */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
      </Routes>
    </>
  )
}

export default App;


//  {/* <Route path='/' element={<ProtectedRoute accessRoles={[ROLE.USER, ROLE.ADMIN]} ><Home /></ProtectedRoute>} /> */}