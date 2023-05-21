export interface BaseUser {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  createdAt?: string;
}
export interface User extends BaseUser {
  id: number;
}

export interface UserResponse {
  User: User;
}

export interface UsersResponse {
  Users: User[];
}
