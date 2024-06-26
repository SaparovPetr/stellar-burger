import { fetchOrder } from '../../../services/thunks/fetchOrder';
import { OrderState, orderSlice } from './orderSlice';
import { mockMyOrderFromList } from './mock';

describe(' 🟢 тесты слайса с данными о заказе из списка моих заказов', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const initialStateForOrder: OrderState = {
    orders: [],
    status: null
  };

  test('тест получения информации о заказе из ленты моих заказов', async () => {
    const currentState = orderSlice.reducer(
      { ...initialStateForOrder },
      fetchOrder.fulfilled(
        mockMyOrderFromList,
        '',
        mockMyOrderFromList.orders[0].number
      )
    );
    expect(currentState).toEqual({
      ...initialStateForOrder,
      orders: mockMyOrderFromList.orders
    });
  });
});
