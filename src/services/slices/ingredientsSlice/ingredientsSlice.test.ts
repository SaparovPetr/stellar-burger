import { RequestStatus, TIngredient } from '../../../utils/types';
import { fetchIngredients } from '../../thunks/fetchIngredients';
import { ConstructorPageState, ingredientsSlice } from './ingredientsSlice';
import { mockIngredients } from './mock';

describe('🟢 тесты игредиентов', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const initialStateForAllIngredients: ConstructorPageState = {
    ingredients: [],
    requestStatus: RequestStatus.Idle,
    error: null
  };

  test('в процессе загрузки', async () => {
    const currentState = ingredientsSlice.reducer(
      { ...initialStateForAllIngredients },
      fetchIngredients.pending('')
    );

    expect(currentState).toEqual({
      ...initialStateForAllIngredients,
      requestStatus: RequestStatus.Loading
    });
  });

  test('успешно загружены', async () => {
    const currentState = ingredientsSlice.reducer(
      {
        ...initialStateForAllIngredients
      },
      fetchIngredients.fulfilled(mockIngredients, '')
    );

    expect(currentState).toEqual({
      ...initialStateForAllIngredients,
      ingredients: mockIngredients,
      requestStatus: RequestStatus.Success
    });
  });

  test('ошибка загрузки', async () => {
    const error = new Error();
    const currentState = ingredientsSlice.reducer(
      {
        ...initialStateForAllIngredients
      },
      fetchIngredients.rejected(error, '')
    );

    expect(currentState).toEqual({
      ...initialStateForAllIngredients,
      requestStatus: RequestStatus.Failed,
      error: 'ошибка получения ингредиентов'
    });
  });
});
