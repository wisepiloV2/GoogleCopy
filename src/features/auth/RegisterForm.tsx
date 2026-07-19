import { Link } from 'react-router-dom';
import { FormLayout } from './components/FormLayout';
import { InputField } from './components/InputField'; 
import { UserBadge } from './components/UserBadge';
import { useFormSteps } from './hooks/useFormSteps';
import { useRegister } from './hooks/useRegister';
import './Form.css';

export function RegisterForm() {
  const { register, onSubmit, errors, isSubmitting, trigger, getValues } = useRegister();

  const { step, handleNext, handleBack, handleKeyDown, isLastStep } = useFormSteps({
    maxSteps: 3,
  });

  // Validamos el paso actual usando 'trigger'
  const validateStepAndProceed = async () => {
    let isStepValid = false;

    if (step === 1) {
      isStepValid = await trigger(['firstName']); // Valida solo el nombre
    } 
    else if (step === 2) {
      isStepValid = await trigger(['email', 'phone']); // Valida email y teléfono
    } 
    else if (step === 3) {
      isStepValid = await trigger(['password', 'confirmPassword']);
      // Validación extra para contraseñas coincidentes
      if (isStepValid && getValues('password') !== getValues('confirmPassword')) {
        alert("Las contraseñas no coinciden");
        return;
      }
    }

    // Si todo está bien, avanzamos o enviamos
    if (isStepValid) {
      handleNext(true, onSubmit);
    }
  };

  const getHeaderInfo = () => {
    switch (step) {
      case 1: return { title: "Crea una cuenta", subtitle: "Ingresa tu nombre" };
      case 2: return { title: "Información de contacto", subtitle: "Ingresa tu correo y teléfono" };
      default: return { title: "Crea una contraseña", subtitle: "Usa letras y números" };
    }
  };

  const { title, subtitle } = getHeaderInfo();
  // Para mostrar el nombre en el badge sin usar useState
  const currentFirstName = getValues('firstName'); 
  const currentEmail = getValues('email');

  return (
    <FormLayout
      title={title}
      subtitle={subtitle}
      actions={
        <>
          {step > 1 && (
            <button type="button" className="btn-secondary" onClick={handleBack}>
              Atrás
            </button>
          )}
          <button 
            type="button" 
            className="btn-primary" 
            onClick={validateStepAndProceed}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cargando...' : isLastStep ? 'Registrarse' : 'Siguiente'}
          </button>
        </>
      }
    >
      <form onSubmit={onSubmit}>
        {step === 1 && (
          <div className="step-container">
            <InputField 
              label="Nombre" 
              id="firstName" 
              {...register('firstName', { required: 'El nombre es obligatorio' })}
              autoFocus 
            />
            {errors.firstName && <span className="error">{errors.firstName.message}</span>}

            <div style={{ marginTop: '16px' }}>
              <InputField 
                label="Apellido (Opcional)" 
                id="lastName" 
                {...register('lastName')}
                onKeyDown={(e) => handleKeyDown(e, validateStepAndProceed)}
              />
            </div>
            <Link to='/login' className='input-link'>¿Ya tienes cuenta? Inicia sesión</Link>
          </div>
        )}

        {step === 2 && (
          <div className="step-container">
            <UserBadge emailOrName={currentFirstName} />
            <InputField 
              label="Email" 
              id="email" 
              type="email"
              {...register('email')}  
              autoFocus 
            />
            <div style={{ marginTop: '16px' }}>
              <InputField 
                label="Teléfono" 
                id="phone" 
                type="tel"
                {...register('phone')}  
                onKeyDown={(e) => handleKeyDown(e, validateStepAndProceed)}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-container">
            <UserBadge emailOrName={currentEmail} />
            <InputField 
              label="Contraseña" 
              id="password" 
              type="password"
              {...register('password')} 
              autoFocus 
            />
            <div style={{ marginTop: '16px' }}>
              <InputField 
                label="Confirmar contraseña" 
                id="confirmPassword" 
                type="password"
                {...register('confirmPassword')}  
                onKeyDown={(e) => handleKeyDown(e, validateStepAndProceed)}
              />
            </div>
          </div>
        )}
      </form>
    </FormLayout>
  );
}