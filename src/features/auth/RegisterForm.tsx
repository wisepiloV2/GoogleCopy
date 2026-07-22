import { Link } from 'react-router-dom';
import { FormLayout } from './components/FormLayout';
import { InputField } from './components/InputField'; 
import { UserBadge } from './components/UserBadge';
import { useFormSteps } from './hooks/useFormSteps';
import { useRegister } from './hooks/useRegister';
import './Form.css';
import { useState } from 'react';
import { ShowPassword } from './components/ShowPassword';

const STEP_FULL_NAME = 1;
const STEP_EMAIL_PHONE = 2;
const STEP_PASSWORD = 3;

export function RegisterForm() {
    const { register, onSubmit, errors, isSubmitting, trigger, getValues } = useRegister();
    const { step, handleNext, handleBack, isLastStep } = useFormSteps({
      maxSteps: 3,
    });
    
    const validateSteps = async (e?: React.BaseSyntheticEvent) => {
        if (e) e.preventDefault();

        let isValid = false;
        if (step === STEP_FULL_NAME) {
            isValid = await trigger(['firstName', 'lastName']); 
        } else if (step === STEP_EMAIL_PHONE) {
            isValid = await trigger(['email', 'phone']); 
        } else if (step === STEP_PASSWORD) {
            isValid = await trigger(['password', 'confirmPassword']);
        }
        
        if (isValid) {
            handleNext(true, onSubmit);
        }
    };
    
    const getHeaderInfo = () => {
        switch (step) {
            case STEP_FULL_NAME: return { title: "Crea una cuenta", subtitle: "Ingresa tu nombre" };
            case STEP_EMAIL_PHONE: return { title: "Información de contacto", subtitle: "Ingresa tu correo y teléfono" };
            default: return { title: "Crea una contraseña", subtitle: "Usa letras y números" };
        }
    };
    
    const { title, subtitle } = getHeaderInfo();
    const currentFullName = getValues('firstName') + " " + getValues('lastName'); 
    const currentEmail = getValues('email');
    const [ showPassword, setShowPassword ] = useState(false);

    return (
    <FormLayout
        title={title}
        subtitle={subtitle}
        actions={
            <>
          {step != STEP_FULL_NAME && (
            <button className="btn-secondary" type="button" onClick={handleBack}>
              Atrás
            </button>
          )}
          <button  
            className="btn-primary" 
            type="submit"
            form="register-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cargando...' : isLastStep ? 'Registrarse' : 'Siguiente'}
          </button>
        </>
        }
    >
        <form id="register-form" onSubmit={validateSteps}>
            {errors.root?.serverError && <p className='field-error-server'>{errors.root.serverError.message}</p>}
            {step == STEP_FULL_NAME && (
                <>
                    <InputField
                        label='Nombre'
                        id='firstName'
                        {...register('firstName')}
                        autoFocus
                    />
                    {errors.firstName && <p className='field-error'>{errors.firstName.message}</p>}

                    <InputField 
                        label="Apellido (Opcional)" 
                        id="lastName" 
                        {...register('lastName')}
                    />

                    {errors.lastName && <p className='field-error'>{errors.lastName.message}</p>}
                    <Link to='/login' className='input-link'>¿Ya tienes cuenta? Inicia sesión</Link>
                </>
            )}
            {step == STEP_EMAIL_PHONE && (
                <>
                    <UserBadge emailOrName={currentFullName} />
                    <InputField 
                        label="Email" 
                        id="email" 
                        type="email"
                        {...register('email')}  
                        autoFocus 
                    />

                    {errors.email && <p className='field-error'>{errors.email.message}</p>}

                    <InputField 
                        label="Teléfono" 
                        id="phone" 
                        type="tel"
                        {...register('phone')}  
                    />
                    {errors.phone && <p className='field-error'>{errors.phone.message}</p>}
                </>
            )}
            {step == STEP_PASSWORD && (
                <>
                    <UserBadge emailOrName={currentEmail} />
                    <InputField 
                        label="Contraseña" 
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        {...register('password')} 
                        autoFocus
                    />
                    {errors.password && <p className='field-error'>{errors.password.message}</p>}

                    <InputField 
                        label="Confirmar contraseña" 
                        id="confirmPassword" 
                        type={showPassword ? "text" : "password"}
                        {...register('confirmPassword')} 
                    />
                    {errors.confirmPassword && <p className='field-error'>{errors.confirmPassword.message}</p>}

                    <ShowPassword
                        show={showPassword} 
                        setShow={setShowPassword} 
                    />
                </>
            )}
        </form>
    </FormLayout>
  );
}