import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TRegisterData,
  logoutApi,
  TLoginData,
  updateUserApi,
  forgotPasswordApi,
  TServerResponse
} from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';
// import { userLogout } from '../slices/userSlice/userSlice';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (LoginData: TLoginData) => {
    const response = await loginUserApi(LoginData);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const checkhUserAuth = createAsyncThunk(
  'user/checkhUserAuth',
  async () => {
    const response = await getUserApi();
    return response;
  }
);

// обновление учетных данных
export const updateUserAuth = createAsyncThunk(
  'user/updateUserAuth',
  async (UpdatedLoginData: TRegisterData) => {
    const response = await updateUserApi(UpdatedLoginData);
    return response;
  }
);

// запрос восстановления пароля
export const markThatPasswordIsLost = createAsyncThunk(
  'user/markThatPasswordIsLost',
  async (UpdatedLoginData: { email: string }) => {
    const response = await forgotPasswordApi(UpdatedLoginData);
    return response;
  }
);

// запрос регистрации
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (RegisterData: TRegisterData) => {
    const response = await registerUserApi(RegisterData);
    return response;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const response = await logoutApi();
  localStorage.clear();
  deleteCookie('accessToken');
  return response;
});
