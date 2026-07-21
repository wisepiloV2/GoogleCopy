import { useForm } from 'react-hook-form';

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export function useRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger, 
    getValues 
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: ''
    }
  });

  const processRegistration = async (data: RegisterFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Simulando envío a Spring Boot. Datos:', data);
      alert('¡Usuario registrado con éxito! (Modo Mock)');
      reset();
    } catch (error) {
      console.error('Error durante el registro:', error);
      alert('Hubo un problema al registrar.');
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