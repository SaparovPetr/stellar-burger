import { RequestStatus } from '../../../utils/types';
import {
  checkhUserAuth,
  loginUser,
  logoutUser,
  registerUser,
  updateUserAuth
} from '../../../services/thunks/fetchUserAuth';
import { IinitialStateForUser, userSlice } from './userSlice';
import {
  mockLoginData,
  mockRegisterData,
  mockStoreWithoutUser,
  mockUpdatedData,
  mockUserInTheStore
} from './mock';

describe('тесты слайса пользователя', () => {
  const initialStateForUser: IinitialStateForUser = {
    isAuthChecked: false,
    data: null,
    requestStatus: RequestStatus.Idle
  };

  describe('🟢 тесты наличия пользователя в сторе', () => {
    test('пользователь в сторе', async () => {
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        checkhUserAuth.fulfilled(mockUserInTheStore, '')
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Success,
        isAuthChecked: true,
        data: mockUserInTheStore
      });
    });

    test('пользователя нет в сторе', async () => {
      const error = new Error();

      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        checkhUserAuth.rejected(error, '')
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Failed,
        isAuthChecked: true
      });
    });

    test('даныне пользователя в процессе загрузки', async () => {
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        checkhUserAuth.pending('')
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Loading
      });
    });
  });

  describe('🟢 тесты запроса на регистрацию', () => {
    test('данные об успехе получены ', async () => {
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        registerUser.fulfilled(mockUserInTheStore, '', mockRegisterData)
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Success,
        data: mockUserInTheStore
      });
    });

    test('данные об успехе не получены ', async () => {
      const error = new Error();
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        registerUser.rejected(error, '', mockRegisterData)
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Failed
      });
    });

    test('данные об успехе в процессе загрузки ', async () => {
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        registerUser.pending('', mockRegisterData)
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Loading
      });
    });
  });

  describe('🟢 тесты запроса на вход', () => {
    test('вход успешен ', async () => {
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        loginUser.fulfilled(mockUserInTheStore, '', mockLoginData)
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Success,
        data: mockUserInTheStore
      });
    });

    test('вход не осуществелен', async () => {
      const error = new Error();
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        loginUser.rejected(error, '', mockLoginData)
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Failed
      });
    });

    test('ожидается ответ на запрос о входе', async () => {
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        loginUser.pending('', mockLoginData)
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Loading
      });
    });
  });

  describe('🟢 тесты запроса на выход', () => {
    test('выход успешен ', async () => {
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        logoutUser.fulfilled(mockStoreWithoutUser, '')
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Success
      });
    });

    test('выход не осуществелен - стор очищен, но куки и локалстрорадж нет', async () => {
      const error = new Error();
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        logoutUser.rejected(error, '')
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Failed,
        data: null
      });
    });

    test('ожидается ответ на запрос о выходе', async () => {
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        logoutUser.pending('')
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Loading
      });
    });
  });

  describe('🟢 тесты запроса на измененине учетных данных', () => {
    test('измененине учетных данных завершено успешно', async () => {
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        updateUserAuth.fulfilled(mockUserInTheStore, '', mockUpdatedData)
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        data: mockUserInTheStore,
        requestStatus: RequestStatus.Success
      });
    });

    test('измененине учетных данных окончилось ошибкой', async () => {
      const error = new Error();
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        updateUserAuth.rejected(error, '', mockUpdatedData)
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Failed
      });
    });

    test('измененине учетных данных в процессе', async () => {
      const currentState = userSlice.reducer(
        { ...initialStateForUser },
        updateUserAuth.pending('', mockUpdatedData)
      );

      expect(currentState).toEqual({
        ...initialStateForUser,
        requestStatus: RequestStatus.Loading
      });
    });
  });
});
