export interface UserSearchResponse {
  total: number;
  users: UserResponse[];
}

export interface UserResponse {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
}
