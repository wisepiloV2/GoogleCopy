import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormLayout } from './components/FormLayout';
import { InputField } from './components/InputField';
import { UserBadge } from './components/UserBadge';
import { useFormSteps } from './hooks/useFormSteps';
import './Form.css';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const { step, handleNext, handleBack, handleKeyDown, isLastStep } = useFormSteps({
    maxSteps: 2,
    onBack: () => {
      setPassword('');
      setShowPassword(false); 
    }
  });

  const handleSubmit = () => {
    console.log('Enviando datos:', { email, password });
  };

  return (
    <FormLayout
      title="Iniciar Sesión"
      subtitle={step === 1 ? "Ingresa tu email para continuar" : "Te damos la bienvenida"}
      actions={
        <>
          {step === 2 && (
            <button type="button" className="btn-secondary" onClick={handleBack}>
              Atrás
            </button>
          )}
          
          <button 
            type="button" 
            className="btn-primary" 
            onClick={() => handleNext(
              step === 1 ? email.trim() !== '' : password.trim() !== '', 
              handleSubmit
            )}
          >
            {isLastStep ? 'Entrar' : 'Siguiente'}
          </button>
        </>
      }
    >
      <form onSubmit={(e) => e.preventDefault()}>
        
        {step === 1 ? (
          <>
            <InputField 
              label="Email" 
              id="email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, () => handleNext(email.trim() !== ''))}
              autoFocus 
            />
            <Link to="/forgot-email" className='input-link'>¿Olvidaste tu email?</Link>
            <Link to='/register' className='input-link'>¿No tienes cuenta? Registrate</Link>
          </>
          
        ) : (
          <div className="step-container">
            <UserBadge emailOrName={email} />
            
            <InputField 
              label="Contraseña" 
              id="password" 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
              autoFocus 
            />

            {/* Checkbox para mostrar/ocultar contraseña */}
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="showPassword" 
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label htmlFor="showPassword">Mostrar contraseña</label>
            </div>

            <Link to="/forgot-password" className='input-forgot'>¿Olvidaste tu contraseña?</Link>
          </div>
        )}

      </form>
    </FormLayout>
  );
}