import { useState } from 'react';
import { FormLayout } from './components/FormLayout';
import { InputField } from './components/InputField';
import { useFormSteps } from './hooks/useFormSteps';
import './Form.css';

export function ForgotEmail() {
  const [recoveryContact, setRecoveryContact] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { step, handleNext, handleBack, handleKeyDown, isLastStep } = useFormSteps({
    maxSteps: 2
  });

  const handleSubmit = () => {
    if (firstName.trim() !== '') {
      console.log('Buscando cuenta con:', { recoveryContact, firstName, lastName });
    }
  };

  const getTitles = () => {
    switch (step) {
      case 1:
        return { 
          title: "Encuentra tu correo", 
          subtitle: "Ingresa tu teléfono o correo de recuperación" 
        };
      case 2:
      default:
        return { 
          title: "¿Cuál es tu nombre?", 
          subtitle: "Ingresa el nombre de tu cuenta" 
        };
    }
  };

  const { title, subtitle } = getTitles();

  return (
    <FormLayout
      title={title}
      subtitle={subtitle}
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
              step === 1 ? recoveryContact.trim() !== '' : firstName.trim() !== '', 
              handleSubmit
            )}
          >
            {isLastStep ? 'Enviar' : 'Siguiente'}
          </button>
        </>
      }
    >
      <form onSubmit={(e) => e.preventDefault()}>
        
        {step === 1 ? (
          <InputField 
            label="Teléfono o correo" 
            id="recoveryContact" 
            type="text"
            value={recoveryContact}
            onChange={(e) => setRecoveryContact(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, () => handleNext(recoveryContact.trim() !== ''))}
            autoFocus 
          />
        ) : (
          <div className="step-container">
            <InputField 
              label="Nombre" 
              id="firstName" 
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoFocus 
            />
            
            <div style={{ marginTop: '16px' }}>
              <InputField 
                label="Apellido" 
                id="lastName" 
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
              />
            </div>
          </div>
        )}

      </form>
    </FormLayout>
  );
}