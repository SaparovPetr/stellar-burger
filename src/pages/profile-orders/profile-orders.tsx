import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { selectMyOrderList } from '../../services/slices/ordersSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchmyOrderList } from '../../services/thunks/fetchmyOrderList';

export const ProfileOrders: FC = () => {
  const orders = useAppSelector(selectMyOrderList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchmyOrderList());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
