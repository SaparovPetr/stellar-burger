import { RequestStatus } from '../../../utils/types';
import { mockOrderList } from './mock';
import { CustomersOrdersState, ordersSlice } from './ordersSlice';
import { fetchmyOrderList } from '../../thunks/fetchmyOrderList';

describe(' 🟢 тесты слайса с данными списка моих заказов', () => {
  const initialStateForCustomersOrders: CustomersOrdersState = {
    orders: [],
    status: RequestStatus.Idle,
    error: null
  };

  test('тест получения списка заказов пользователя', async () => {
    const currentState = ordersSlice.reducer(
      { ...initialStateForCustomersOrders },
      fetchmyOrderList.fulfilled(mockOrderList.orders, '')
    );
    expect(currentState).toEqual({
      ...initialStateForCustomersOrders,
      orders: mockOrderList.orders,
      status: 'Success'
    });
  });

  test('тест ошибки получения списка заказов пользователя', async () => {
    const error = new Error();
    const currentState = ordersSlice.reducer(
      { ...initialStateForCustomersOrders },
      fetchmyOrderList.rejected(error, '')
    );
    expect(currentState).toEqual({
      ...initialStateForCustomersOrders,
      status: RequestStatus.Failed,
      error: 'ошибка получения списка заказов пользователя'
    });
  });
});
