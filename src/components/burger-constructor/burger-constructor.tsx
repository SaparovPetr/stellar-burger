/* eslint-disable prettier/prettier */
import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '../../services/store';
import {
  selectConstuctorItems,
  selectOrderModalData,
  selectOrderRequest
} from '../../services/slices/burgerConstructorSlice';
// import { selectIngredientsForConstructor } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = useAppSelector(
  //   (state: RootState) => state.burgerConstructorSlice.constructorItems
  // )
  const constructorItems = useAppSelector(selectConstuctorItems);
  const orderRequest = useAppSelector(selectOrderRequest);
  const orderModalData = useAppSelector(selectOrderModalData);

  // console.log(constructorItems.bun.name)
  // console.log(orderRequest)
  // console.log(orderModalData)

  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  // const orderRequest = false;

  // const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
