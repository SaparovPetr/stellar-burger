import { RequestStatus } from '../../../utils/types';
import { FeedState, feedSlice } from './feedSlice';
import { fetchFeed } from '../../thunks/fetchFeed';
import { mockFeed } from './mock';

describe('🟢 тесты слайса ленты заказов', () => {
  const initialStateForOrders: FeedState = {
    orders: [],
    total: 0,
    totalTooday: 0,
    status: RequestStatus.Idle,
    error: null
  };

  test('тест ленты при загрузке', async () => {
    const currentState = feedSlice.reducer(
      { ...initialStateForOrders },
      fetchFeed.pending('')
    );

    expect(currentState).toEqual({
      ...initialStateForOrders,
      status: RequestStatus.Loading,
      error: null
    });
  });

  test('тест ленты при успехе', async () => {
    const currentState = feedSlice.reducer(
      {
        ...initialStateForOrders
      },
      fetchFeed.fulfilled(mockFeed, '')
    );

    expect(currentState).toEqual({
      ...initialStateForOrders,
      orders: mockFeed.orders,
      total: mockFeed.total,
      totalTooday: mockFeed.totalToday,
      status: RequestStatus.Success,
      error: null
    });
  });

  test('тест ленты при ошибке', async () => {
    const error = new Error();

    const currentState = feedSlice.reducer(
      {
        ...initialStateForOrders
      },
      fetchFeed.rejected(error, '')
    );

    expect(currentState).toEqual({
      ...initialStateForOrders,
      status: RequestStatus.Failed,
      error: 'ошибка получения ленты'
    });
  });
});
