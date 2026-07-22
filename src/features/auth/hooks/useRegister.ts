import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';

const registerSchema = z.object({
  firstName: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre es demasiado largo'),
  lastName: z.string()
    .max(50, 'El apellido es demasiado largo')
    .optional(),
  email: z.string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('El formato del correo no es válido'),
  phone: z.string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .regex(/^[0-9+\- ]+$/, 'Solo se permiten números, espacios y los signos + o -'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  confirmPassword: z.string()
    .min(1, 'Debes confirmar tu contraseña')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'], 
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export function useRegister() {
  const navigate = useNavigate();
  const { create } = useAuth();
  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger, 
    getValues,
    setError,
    clearErrors
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: ''
    }
  });

  const processRegistration = async (data: RegisterFormData) => {
    try {
      
      await create(data);
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
    onSubmit: handleSubmit(processRegistration),
    errors, 
    isSubmitting,
    trigger,
    getValues
  };
}