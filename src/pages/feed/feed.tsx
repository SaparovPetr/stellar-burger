import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { RequestStatus, TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { selectOrders, selectStatus } from '../../services/slices/feedSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchFeed } from '../../services/thunks/fetchFeed';

export const Feed: FC = () => {
  const orders: TOrder[] = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed());
      }}
    />
  );
};
