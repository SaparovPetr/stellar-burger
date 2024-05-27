import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder, TUser } from '@utils-types';
import {
  checkhUserAuth,
  registerUser,
  loginUser,
  logoutUser
} from '../thunks/fetchUserAuth';

import { TUserResponse } from '@api';

interface IinitialStateForUser {
  isAuthChecked: boolean;
  data: TUserResponse | null; // 🔴 поправить тип
  requestStatus: RequestStatus;
}

const initialStateForUser: IinitialStateForUser = {
  isAuthChecked: false,
  data: null,
  requestStatus: RequestStatus.Idle
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialStateForUser,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
    }
  },
  selectors: {
    // selectUserPersonalData: (sliceState) => sliceState.data?.user,
    selectUser: (sliceState) => sliceState.data?.user,
    getIsAuthChecked: (sliceState) => sliceState.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      //проверка наличия пользователя в сторе
      .addCase(checkhUserAuth.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.isAuthChecked = true;
        state.data = action.payload;
      })
      .addCase(checkhUserAuth.pending, (state, action) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(checkhUserAuth.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.isAuthChecked = true;
      })

      // запрос на регистрацию
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })

      // запрос на вход
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })

      // запрос на выход
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.data = null;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.data = null;
      });
  }
});

export const { selectUser, getIsAuthChecked } = userSlice.selectors;

export default userSlice.reducer;

export const { authCheck, userLogout } = userSlice.actions;
