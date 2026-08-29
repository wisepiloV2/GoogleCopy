export interface User {
  username: string;
  email: string;
  phone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  phone: string;
  email: string;
  password: string;
}