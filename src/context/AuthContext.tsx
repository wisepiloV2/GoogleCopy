import {createContext, useContext, useEffect, useState, type ReactNode, useCallback} from 'react';
import {loginUser,registerUser,getCurrentUser, logoutUser} from '@/api/apiAuth';
import type {User, LoginRequest, RegisterRequest} from '@/api/types';
import { setUnauthorizedHandler } from '@/api/apiClient';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function login(data: LoginRequest): Promise<User> {
    const user = await loginUser(data);

    setUser(user);

    return user;
  }

  async function register(data: RegisterRequest): Promise<User> {
    const user = await registerUser(data);

    setUser(user);

    return user;
  }

  async function logout(): Promise<void> {
    await logoutUser();

    setUser(null);
  }

  const checkSession = useCallback(async (): Promise<void> => {
    try {
      const user = await getCurrentUser();

      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, []);

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
    throw new Error('use Auth debe estar dentro de AuthProvider.');
  }

  return context;
}