export const mockUserInTheStore = {
  success: true,
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTQ2NzE1OTdlZGUwMDAxZDA2YzhmMyIsImlhdCI6MTcxOTM5MjMyMiwiZXhwIjoxNzE5MzkzNTIyfQ.U3aKvDGKlBzyY4fylFsBFBXDq8e_vtqwmbpV9JpGWAw',
  refreshToken:
    'dda3b169340f4e7de1740dd9c23f7acb1d4caa643795f4c0f3a7d3d8c6ad5dcd57f0307e4b130d0c',
  user: {
    email: 'example@gmail.com',
    name: 'example'
  }
};

export const mockRegisterData = {
  email: 'example@gmail.com',
  name: 'example',
  password: 'example-password'
};

export const mockLoginData = {
  email: 'example@gmail.com',
  password: 'example-password'
};

export const mockStoreWithoutUser = {
  success: true,
  message: 'Successful logout'
};

export const mockUpdatedData = {
  email: 'example1@gmail.com',
  name: 'example1',
  password: 'example-password1'
};
