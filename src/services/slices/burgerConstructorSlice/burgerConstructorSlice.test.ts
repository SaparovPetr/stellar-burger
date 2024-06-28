import {
  burgerConstructorSlice,
  increseIndex,
  initialStateForConstructor,
  removeConstuctorItems,
  setConstuctorItems
} from './burgerConstructorSlice';
import {
  mockBun,
  mockBunResult,
  mockEmptyState,
  mockMain,
  mockMainResult,
  mockStateWithThreeMains,
  mockThreeMainsAfterMoving
} from './mock';
const uuid = require('uuid');

function makeObjectWithId(object: any) {
  object.id;
  return object;
}

describe('🟢 тесты конструктора', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('добавление булки', async () => {
    const preparedBun = { ...mockBun, id: uuid.v4() };
    const currentState = burgerConstructorSlice.reducer(
      { ...initialStateForConstructor },
      setConstuctorItems(preparedBun)
    );

    const bunFromState = makeObjectWithId(currentState.constructorItems.bun);
    const objFromStoreWithoutId = Object.assign({}, bunFromState);
    delete objFromStoreWithoutId.id;

    const bunFromMock = makeObjectWithId(mockBunResult.constructorItems.bun);
    const objFromMockWithoutId = Object.assign({}, bunFromMock);
    delete objFromMockWithoutId.id;

    expect(objFromStoreWithoutId).toEqual(objFromMockWithoutId);
  });

  test('добавление ингредиента между булок', async () => {
    const preparedMain = { ...mockMain, id: uuid.v4() };
    const currentState = burgerConstructorSlice.reducer(
      { ...initialStateForConstructor },
      setConstuctorItems(preparedMain)
    );

    const mainFromState = makeObjectWithId(
      currentState.constructorItems.ingredients[0]
    );
    const objFromStoreWithoutId = Object.assign({}, mainFromState);
    delete objFromStoreWithoutId.id;

    const mainFromMock = makeObjectWithId(
      mockMainResult.constructorItems.ingredients[0]
    );
    const objFromMockWithoutId = Object.assign({}, mainFromMock);
    delete objFromMockWithoutId.id;

    expect(objFromStoreWithoutId).toEqual(objFromMockWithoutId);
  });

  test('удаление ингредиента', async () => {
    const preparedMain = { ...mockMain, id: uuid.v4() };
    const currentState = burgerConstructorSlice.reducer(
      { ...initialStateForConstructor },
      setConstuctorItems(preparedMain)
    );

    const stateAfterRemoving = burgerConstructorSlice.reducer(
      { ...currentState },
      removeConstuctorItems(currentState.constructorItems.ingredients[0])
    );

    expect(stateAfterRemoving).toEqual(mockEmptyState);
  });

  test('перемещение вниз', async () => {
    const stateAfterRemoving = burgerConstructorSlice.reducer(
      {
        ...mockStateWithThreeMains
      },
      increseIndex(1)
    );

    expect(stateAfterRemoving.constructorItems.ingredients).toEqual(
      mockThreeMainsAfterMoving
    );
  });
});
