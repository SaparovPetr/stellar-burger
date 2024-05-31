import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import {
  setArreyForOrder,
  setConstuctorItems
} from '../../services/slices/burgerConstructorSlice';
import { useAppDispatch } from '../../services/store';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();

    const dispatch = useAppDispatch();
    const handleAdd = () => {
      dispatch(setConstuctorItems(ingredient));
      dispatch(setArreyForOrder(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
