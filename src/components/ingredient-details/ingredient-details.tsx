import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useAppSelector } from '../../services/store';
import { selectOneIngredient } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const ingredientData = useAppSelector(selectOneIngredient);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
