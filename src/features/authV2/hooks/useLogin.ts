import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string()
    .min(1, 'El email es requerido')
    .email('Debe ser un formato de correo válido'),
  password: z.string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset,
    trigger,
    setError,
    clearErrors
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const processLogin = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      reset();
      navigate('/');

    } catch (error) {
      const mensaje = error instanceof Error 
        ? error.message 
        : 'Ocurrió un error inesperado';
          
      setError('root.serverError', { type: 'server', message: mensaje });
      setTimeout(() => clearErrors('root.serverError'), 5000);
    }
  };

  return {
    register, 
    onSubmit: handleSubmit(processLogin),
    errors, 
    isSubmitting,
    trigger,
    getValues
  };
}