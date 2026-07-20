import { useForm } from 'react-hook-form';
//import { useNavigate } from 'react-router-dom';
//import { useAuth } from '../../../context/AuthProvider';



interface LoginFormData {
    email: string;
    password: string;
}

export function useLogin() {
  //const navigate = useNavigate();
  //const { login } = useAuth();
  

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
    setError,
    clearErrors
  } = useForm<LoginFormData>({
    mode: 'onChange',
  });

  const processRegistration = async (data: LoginFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      reset();
      
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : 'Error inesperado en el servidor';
      
      setError('root.serverError', {
        type: 'server',
        message: mensaje
      });

      setTimeout(() => {
        clearErrors('root.serverError');
      }, 5000);
    }
  };

  return {
    onSubmit: handleSubmit(processRegistration),
    errors, 
    isSubmitting,
    trigger,
  };
}