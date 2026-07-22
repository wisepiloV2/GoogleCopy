import { Link } from 'react-router-dom';
import { FormLayout } from './components/FormLayout';
import { InputField } from './components/InputField';
import { useFormSteps } from './hooks/useFormSteps';
import { useForgotEmail } from './hooks/useForgotEmail';
import './Form.css';

const STEP_PHONE = 1;
const STEP_SUCCESS = 2;

export function ForgotEmail() {
  const { step, handleNext } = useFormSteps({ maxSteps: 2 });
  const { phoneFieldProps, onSubmit, errors, isSubmitting } = useForgotEmail(() => {
    handleNext(true); 
  });

  return (
    <FormLayout
      title={step === STEP_PHONE ? "Recuperar cuenta" : "Revisa tu correo"}
      subtitle={
        step === STEP_PHONE 
          ? "Ingresa tu telefono vinculado a la cuenta." 
          : "Te hemos enviado un mail, revisa tu bandeja."
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
              form='f-email-form' 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          )}
        </>
      }
    >
      <form id="f-email-form" onSubmit={onSubmit}>
        {errors.root?.serverError && <p className='field-error-server'>{errors.root.serverError.message}</p>}

        {step === STEP_PHONE && (
          <>
            <InputField 
              label="Telefono" 
              id="phone" 
              type="phone"
              autoFocus 
              {...phoneFieldProps} 
            />
            
            {errors.phone && (
              <p className='field-error' style={{ color: 'red', fontSize: '14px' }}>
                {errors.phone.message}
              </p>
            )}
          </>
        )}
      </form>
    </FormLayout>
  );
}