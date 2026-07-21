import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUserByEmailAndPassword } from '../../auth/api/apiUsers';
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
        const idUser = await loginUserByEmailAndPassword(data.email, data.password);
        
        if (idUser instanceof Error) {
          setError('root.serverError', { type: 'server', message: idUser.message });
          setTimeout(() => clearErrors('root.serverError'), 5000);
          
          return;
        } 
        
        await login(idUser);
        reset();
        navigate('/');

      } catch (error) {
        const mensaje = error instanceof Error ? error.message : 'Error inesperado en el servidor';
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