import { TOrderResponse } from '@api';

export const mockMyOrderFromList: TOrderResponse = {
  success: true,
  orders: [
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      _id: '667ab12e856777001bb1d9cf',
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-06-25T11:59:42.357Z',
      updatedAt: '2024-06-25T11:59:42.832Z',
      number: 44232
    }
  ]
};
