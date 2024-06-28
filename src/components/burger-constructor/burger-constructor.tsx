import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  selectArray,
  selectConstuctorItems,
  selectOrderModalData,
  selectOrderRequest
} from '../../services/slices/burgerConstructorSlice/burgerConstructorSlice';
import { clearMyOrder, fetchMyOrder } from '../../services/thunks/fetchMyOrder';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../services/slices/userSlice/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useAppSelector(selectConstuctorItems);
  const orderRequest = useAppSelector(selectOrderRequest);
  const orderModalData = useAppSelector(selectOrderModalData);
  const ingredientsForOrder = useAppSelector(selectArray);
  const userIsLogined = useAppSelector(selectUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onOrderClick = () => {
    if (
      userIsLogined &&
      constructorItems.ingredients.length &&
      constructorItems.bun._id !== '' &&
      ingredientsForOrder.length
    ) {
      dispatch(fetchMyOrder(ingredientsForOrder));
    }
    if (
      !userIsLogined &&
      constructorItems.ingredients.length &&
      constructorItems.bun._id !== '' &&
      ingredientsForOrder.length
    ) {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(clearMyOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

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
