import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <NavLink
            to='/stellar-burger/'
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
        </>
        <>
          <NavLink
            to='/stellar-burger/feed'
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </>
      </div>
      <NavLink to='/stellar-burger/'>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
      </NavLink>
      <div className={styles.link_position_last}>
        <NavLink
          to='/stellar-burger/profile'
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link
          }
        >
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </div>
    </nav>
  </header>
);
