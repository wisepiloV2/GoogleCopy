import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '@/api/apiAuth';
import type { User, LoginRequest, RegisterRequest } from '@/api/types';
import { setUnauthorizedHandler } from '@/api/customFetch';
import { apiUser } from '@/api/apiUser';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => Promise<void>;
  update: (updatedFields: Partial<User>) => Promise<void>;
  checkPassword: (inputPassword: string) => Promise<boolean>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function login(data: LoginRequest): Promise<User> {
    const loggedUser = await loginUser(data);
    setUser(loggedUser);
    return loggedUser;
  }

  async function register(data: RegisterRequest): Promise<User> {
    const registeredUser = await registerUser(data);
    setUser(registeredUser);
    return registeredUser;
  }

  async function logout(): Promise<void> {
    await logoutUser();
    setUser(null);
  }

  async function update(updatedFields: Partial<User>): Promise<void> {
    if (!user) {
      throw new Error('No hay usuario autenticado para actualizar.');
    }

    if (updatedFields.username) await apiUser.updateUsername(updatedFields.username);
    if (updatedFields.email) await apiUser.updateEmail(updatedFields.email);
    if (updatedFields.phone) await apiUser.updatePhone(updatedFields.phone);

    setUser((prevUser) => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        ...updatedFields,
      };
    });
  }

  async function checkPassword(inputPassword: string): Promise<boolean> {
    if (!user) {
      throw new Error('No hay usuario autenticado para verificar la contraseña.');
    }

    return await apiUser.verifyPassword(inputPassword);
  }

  const checkSession = useCallback(async (): Promise<void> => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
    });

    return () => {
      setUnauthorizedHandler(null);
    };
  }, []);

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
    update,
    checkPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider.');
  }

  return context;
}