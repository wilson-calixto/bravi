import { User, UserResponse, UsersResponse } from '../models/User';

export const person1 = {
  address: '432432 rerwer3',
  firstName: '4444',
  id: 17,
  email: 'a@a.com',
  createdAt: '2023-05-20T13:49:22',
  phone: '9298949399',
  lastName: 'calixto',
  activated: false,
  updatedAt: null,
};

export const mockUser: User = {
  id: 1,
  firstName: 'fsdfdsferer23123',
  lastName: '54435435',
  email: '4rwetrwetretre@dsd.com',
  address: '432432 rerwer3',
  phone: '8989888898',
  createdAt: '1684338987602',
};
export const mockUsersResponse: UsersResponse = {
  Users: [mockUser],
};

export const mockUserResponse: UserResponse = {
  User: mockUser,
};
