import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
  username: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre es demasiado largo'),
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

export function useRegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      username: '', email: '', phone: '', password: '', confirmPassword: ''
    }
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const { confirmPassword, ...requestData } = data;
      const response = await register(requestData);
      console.log("Usuario registrado con éxito: ", response);
      reset();
      navigate('/');
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
    apiError
  }
}