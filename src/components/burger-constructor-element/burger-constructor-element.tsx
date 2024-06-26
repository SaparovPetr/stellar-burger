import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppDispatch } from '../../services/store';
import {
  decreseIndex,
  increseIndex,
  removeConstuctorItems,
  setArreyForOrder
} from '../../services/slices/burgerConstructorSlice/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();

    const handleMoveUp = () => {
      dispatch(increseIndex(index));
    };
    const handleMoveDown = () => {
      dispatch(decreseIndex(index));
    };

    const handleClose = () => {
      dispatch(removeConstuctorItems(ingredient));
      dispatch(setArreyForOrder(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
