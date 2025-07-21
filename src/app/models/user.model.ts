export interface User {
  id: string;
  email: string;
  fullName: string;
  isAdmin: boolean;
  createdAt: Date;
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}