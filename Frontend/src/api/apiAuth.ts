import { customFetch } from '@/api/customFetch';
import type {User, LoginRequest, RegisterRequest} from '@/api/types';

export async function loginUser(data: LoginRequest): Promise<User> {
  const response = await customFetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json() as Promise<User>;
}

export async function registerUser(data: RegisterRequest): Promise<User> {
  const response = await customFetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json() as Promise<User>;
}

export async function getCurrentUser(): Promise<User> {
  const response = await customFetch('/api/auth/me');
  return response.json() as Promise<User>;
}

export async function logoutUser(): Promise<void> {
  await customFetch('/api/auth/logout', {
    method: 'POST',
  });
}