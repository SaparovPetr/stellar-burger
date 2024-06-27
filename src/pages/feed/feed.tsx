/* eslint-disable react/no-this-in-sfc */
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { selectOrders, selectStatus } from '../../services/slices/feedSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { clearFeed, fetchFeed } from '../../services/thunks/fetchFeed';

export const Feed: FC = () => {
  const orders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const resetdFeed = () => {
    dispatch(clearFeed());
    dispatch(fetchFeed());
  };

  return <FeedUI orders={orders} handleGetFeeds={() => resetdFeed()} />;
};
