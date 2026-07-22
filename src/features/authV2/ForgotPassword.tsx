import { Link } from 'react-router-dom';
import { FormLayout } from './components/FormLayout';
import { InputField } from './components/InputField';
import { useFormSteps } from './hooks/useFormSteps';
import { useForgotPassword } from './hooks/useForgotPasssword';
import './Form.css';

const STEP_EMAIL = 1;
const STEP_SUCCESS = 2;

export function ForgotPassword() {
  const { step, handleNext } = useFormSteps({ maxSteps: 2 });
  const { emailFieldProps, onSubmit, errors, isSubmitting } = useForgotPassword(() => {
    handleNext(true); 
  });

  return (
    <FormLayout
      title={step === STEP_EMAIL ? "Recuperar cuenta" : "Revisa tu correo"}
      subtitle={
        step === STEP_EMAIL 
          ? "Ingresa tu correo electrónico para restablecer la contraseña" 
          : "Te hemos enviado un enlace con instrucciones"
      }
      actions={
        <>
          {step === STEP_SUCCESS ? (
            <>
              <Link className="btn-primary" to='/'>
                Volver al inicio
              </Link>
            </>
          ) : (
            <button 
              className='btn-primary' 
              type='submit' 
              form='f-pass-form' 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          )}
        </>
      }
    >
      <form id="f-pass-form" onSubmit={onSubmit}>
        {errors.root?.serverError && <p className='field-error-server'>{errors.root.serverError.message}</p>}

        {step === STEP_EMAIL && (
          <>
            <InputField 
              label="Email" 
              id="email" 
              type="email"
              autoFocus 
              {...emailFieldProps} 
            />
            
            {errors.email && (
              <p className='field-error' style={{ color: 'red', fontSize: '14px' }}>
                {errors.email.message}
              </p>
            )}
          </>
        )}
      </form>
    </FormLayout>
  );
}