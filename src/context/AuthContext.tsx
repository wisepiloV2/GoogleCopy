// AuthContext.tsx
import { createContext, useState, useContext, type ReactNode } from 'react';
import { getUserById, type User } from '../api/apiUsers'; // Asegúrate de ajustar la ruta

// 1. Actualizamos el contrato de lo que expone el contexto
interface AuthContextType {
  user: User | null;           // El objeto usuario con todos sus datos y roles
  isLoggedIn: boolean;         // Derivado de si existe el usuario
  isLoading: boolean;          // Para mostrar pantallas de carga
  login: (id: string) => Promise<void>; 
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  // 2. Estados principales
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 3. isLoggedIn se calcula automáticamente (si hay user, es true)
  const isLoggedIn = user !== null;

  // 4. Función de Login (Asíncrona)
  const login = async (id: string) => {
    setIsLoading(true); // Iniciamos carga
    try {
      const fetchedUser = await getUserById(id);
      
      if (fetchedUser) {
        setUser(fetchedUser);
      } else {
        // Aquí podrías manejar el error si el usuario no existe (contraseña incorrecta en la vida real)
        throw new Error('Credenciales incorrectas o usuario no encontrado');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      throw error; // Lanzamos el error para que el componente del formulario lo muestre
    } finally {
      setIsLoading(false); // Terminamos carga, pase lo que pase
    }
  };

  // 5. Función de Logout (Síncrona)
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, logout }}>
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