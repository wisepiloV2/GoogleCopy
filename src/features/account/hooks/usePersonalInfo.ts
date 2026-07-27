import { useAuth } from '../../../context/AuthProvider';

export function usePersonalInfo() {
  const { user } = useAuth();

  return { 
    user
  };
}