export interface baseUser {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  createdAt?: string;
}
export interface User extends baseUser {
  id: number;
}

export interface UserResponse {
  User: User;
}

export interface UsersResponse {
  Users: User[];
}
