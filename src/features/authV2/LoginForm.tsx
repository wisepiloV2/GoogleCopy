import { Link } from 'react-router-dom';
import { FormLayout } from './components/FormLayout';
import { InputField } from './components/InputField';
import { useFormSteps } from './hooks/useFormSteps';
import { useLogin } from './hooks/useLogin'
import { UserBadge } from './components/UserBadge';
import { useState } from 'react';

const STEP_EMAIL = 1;
const STEP_PASSWORD = 2;

export function LoginForm() {
    const { register, isSubmitting, errors, onSubmit, trigger, getValues } = useLogin();
    const { step, handleNext, handleBack, isLastStep } = useFormSteps({maxSteps: 2});
    
    const [ showPassword, setShowPassword ] = useState(false);

    const handleFormSubmit = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        
        if (step === STEP_EMAIL) {
            const isEmailValid = await trigger('email');
            if (isEmailValid) {
                handleNext(true); 
            }
        } else {
            await onSubmit(e);
        }
    };

    const emailInput = getValues('email'); 

    return (
        <FormLayout
            title="Iniciar Sesión"
            subtitle={step === STEP_EMAIL ? "Ingresa tu email para continuar" : "Te damos la bienvenida"}
            actions={
                <>
                    {step === STEP_PASSWORD && (
                        <button className="btn-secondary" type="button" onClick={handleBack}>
                            Atrás
                        </button>
                    )}
                    <button  
                        className="btn-primary" 
                        type="submit"
                        form="login-form"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Cargando...' : isLastStep ? 'Ingresar' : 'Siguiente'}
                    </button>
                </>
            }
        >
            <form id='login-form' onSubmit={handleFormSubmit}>
                {errors.root?.serverError && <p className='field-error-server'>{errors.root.serverError.message}</p>}
                
                {step === STEP_EMAIL ? (
                    <>
                        <InputField 
                            label="Email" 
                            id="email" 
                            type="email"
                            autoFocus 
                            {...register('email')}
                        />
                        {errors.email && <span className="error">{errors.email.message}</span>}
                        <Link to="/forgot-email" className='input-link'>¿Olvidaste tu email?</Link>
                        <Link to='/register' className='input-link'>¿No tienes cuenta? Registrate</Link>
                    </>      
                ) : (
                    <>
                        <UserBadge emailOrName={emailInput} />
                        <InputField 
                            label="Contraseña" 
                            id="password" 
                            type={showPassword ? "text" : "password"}
                            autoFocus 
                            {...register('password')}
                        />
                        {errors.password && <span className="error">{errors.password.message}</span>}
                
                        <div className="checkbox-group">
                            <input 
                                type="checkbox" 
                                id="showPassword" 
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                            />
                            <label htmlFor="showPassword">Mostrar contraseña</label>
                        </div>
                
                        <Link to="/forgot-password" className='input-link'>¿Olvidaste tu contraseña?</Link>
                    </>
                )}
            </form>
        </FormLayout>
    );
}