import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';


interface LoginData {
  email: string;
  password: string;
}

export function useLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (apiError) {
      const timer = setTimeout(() => {
        setApiError(null); 
      }, 4000); 
      return () => clearTimeout(timer);
    }
  }, [apiError]);

  const methods = useForm<LoginData>({
    defaultValues: {
      email: '', password: ''
    }
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    setApiError(null);
    try {
      await login(data);
      reset();
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('Error desconocido al ingresar.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    isLoading, 
    apiError,
  }
}