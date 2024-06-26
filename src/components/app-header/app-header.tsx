import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';
import {
  getIsAuthChecked,
  selectUserName
} from '../../services/slices/userSlice/userSlice';

export const AppHeader: FC = () => {
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const userName = useAppSelector(selectUserName);
  if (isAuthChecked) {
    return <AppHeaderUI userName={userName} />;
  }
};
