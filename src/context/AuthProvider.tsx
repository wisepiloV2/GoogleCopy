import { createContext, useState, useContext, type ReactNode } from 'react';
import { getUserByEmailAndPassword, createUser, type User } from '../features/auth/api/apiUsers';


interface AuthContextType {
  user: User | null;           
  isLogged: boolean;         
  isLoading: boolean;          
  login: (email: string, password: string) => Promise<void | Error>; 
  logout: () => void;
  create: (userData: User) => Promise<void | Error>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isLogged = user !== null;

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const fetchedUser = await getUserByEmailAndPassword(email, password);
      setUser(fetchedUser);
      
    } catch (error: any) {
      if (error.status === 402) {
        throw new Error('No pudimos encontrar una cuenta con ese email.');
      }
      
      if (error.status === 401) {
        throw new Error('La contraseña es incorrecta.');
      }

      throw new Error('Ocurrió un error inesperado al intentar iniciar sesión.');
      
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const create = async (userData: User) => {
    setIsLoading(true);
    try{
      const fetchedUser = await createUser(userData);
      setUser(fetchedUser);
    } catch (error: any){

      if (error.status == 409) {
        throw new Error(error.message);
      } else {
        throw new Error('Ocurrió un error inesperado al intentar iniciar sesión.');
      }

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLogged, isLoading, login, logout, create }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
}