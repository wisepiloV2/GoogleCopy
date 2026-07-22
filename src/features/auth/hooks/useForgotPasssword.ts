import { useForm } from 'react-hook-form';
import { forgotPassword } from '../../auth/api/apiUsers';

type ForgotPasswordData = {
  email: string;
};

export function useForgotPassword(onSuccess: () => void) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    mode: 'onChange',
  });

  const emailFieldProps = register('email', {
    required: 'Es necesario ingresar un email',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Debe ser un formato de correo válido',
    },
  });

  const processSubmit = async (data : ForgotPasswordData) => {
    try {
      await forgotPassword(data.email);
      onSuccess();
    } catch (error: any) {
      const mensaje = error.status == 409 
        ? error.message 
        : 'Ocurrió un error inesperado';
          
      setError('root.serverError', { type: 'server', message: mensaje });
      setTimeout(() => clearErrors('root.serverError'), 5000);
    }
  }

  return {
    emailFieldProps,
    onSubmit: handleSubmit(processSubmit),
    errors,
    isSubmitting,
  };
}