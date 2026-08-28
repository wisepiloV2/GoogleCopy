import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../api/loginApi';

interface LoginData {
  email: string;
  password: string;
}

export function useLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

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
      const response = await loginUser(data);
      console.log("Usuario logeado con éxito: ", response);
      reset();
    } catch (error: any) {
      setApiError(error.message || 'Error desconocido al registrar.');
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