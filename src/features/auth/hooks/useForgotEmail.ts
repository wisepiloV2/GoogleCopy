import { useForm } from 'react-hook-form';
import { forgotEmail } from '../../auth/api/apiUsers';

type ForgotEmailData = {
  phone: string;
};

export function useForgotEmail(onSuccess: () => void) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ForgotEmailData>({
    mode: 'onChange',
  });

  const phoneFieldProps = register('phone', {
    required: 'Es necesario ingresar un teléfono',
    pattern: {
      value: /^\+?[0-9\s\-()]{8,15}$/,
      message: 'Debe ser un formato de teléfono válido',
    },
  });

  const processSubmit = async (data : ForgotEmailData) => {
    try {
      await forgotEmail(data.phone);
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
    phoneFieldProps,
    onSubmit: handleSubmit(processSubmit),
    errors,
    isSubmitting,
  };
}