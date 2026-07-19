import { useState } from 'react';
import { FormLayout } from './components/FormLayout';
import { InputField } from './components/InputField';
import { useFormSteps } from './hooks/useFormSteps';
import './Form.css';

export function ForgotPassword() {
  const [email, setEmail] = useState('');

  const { step, handleNext, handleKeyDown } = useFormSteps({
    maxSteps: 2
  });

  const handleSubmit = () => {
    console.log('Enviando enlace de recuperación a:', email);
    handleNext(true); // Forzamos avanzar al paso 2 que es el mensaje de éxito
  };

  return (
    <FormLayout
      title={step === 1 ? "Recuperar cuenta" : "Revisa tu correo"}
      subtitle={
        step === 1 
          ? "Ingresa tu correo electrónico para restablecer la contraseña" 
          : "Te hemos enviado un enlace con instrucciones"
      }
      actions={
        <>
          {step === 1 ? (
            <button 
              type="button" 
              className="btn-primary" 
              onClick={() => handleNext(email.trim() !== '', handleSubmit)}
            >
              Siguiente
            </button>
          ) : (
            <button type="button" className="btn-primary" onClick={() => console.log('Volver al login')}>
              Volver al inicio
            </button>
          )}
        </>
      }
    >
      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && (
          <InputField 
            label="Email" 
            id="email" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, () => handleNext(email.trim() !== '', handleSubmit))}
            autoFocus 
          />
        )}
      </form>
    </FormLayout>
  );
}