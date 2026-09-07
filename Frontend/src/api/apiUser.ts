import { customFetch } from './customFetch';

export const apiUser = {
  verifyPassword: async (password: string): Promise<boolean> => {
    try {
      await customFetch('/api/auth/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      return true; 
    } catch (error) {
      return false;
    }
  },

  updateUsername: async (username: string): Promise<void> => {
    await customFetch('/api/users/username', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
  },

  updateEmail: async (email: string): Promise<void> => {
    await customFetch('/api/users/email', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
  },

  updatePhone: async (phone: string): Promise<void> => {
    await customFetch('/api/users/phone', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
  },

  updatePassword: async (newPassword: string): Promise<void> => {
    await customFetch('/api/users/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword }),
    });
  },
};