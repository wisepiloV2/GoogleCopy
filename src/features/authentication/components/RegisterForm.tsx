import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useFormSteps } from '../hooks/useFormSteps';
import { Button } from '../../../components/Button/Button';
import styles from './RegisterForm.module.css';
import { InputField } from './InputField';

const STEP_USERNAME = 1;
const STEP_CONTACT_INFO = 2; 
const STEP_PASSWORD = 3;

export function RegisterForm({ isLoading } : { isLoading?: boolean }) {
  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const {
    step,
    nextStep,
    handleBack,
    isFirstStep,
    isLastStep,
  } = useFormSteps({
    maxSteps: 3,
    fieldsByStep: {
      1: ['username'],
      2: ['email', 'phone'],
      3: ['password', 'confirmPassword'],
    },
  });

  return (
    <div className={styles.container}>
      {step === STEP_USERNAME && (
        <InputField
          label="Nombre de Usuario"
          placeholder="Escribe tu nombre de usuario"
          error={errors.username?.message as string}
          {...register('username')}
        />
      )}

      {step === STEP_CONTACT_INFO && (
        <>
          <InputField
            label='Email'
            type='email'
            placeholder='Escribe tu email'
            error={errors.email?.message as string}
            {...register('email')}
          />
          
          <InputField
            label='Teléfono'
            type='tel'
            placeholder='Ej: +123456789'
            error={errors.phone?.message as string}
            {...register('phone')}
          />
        </>
      )}

      {step === STEP_PASSWORD && (
        <>
          <InputField 
            type={showPassword ? 'text' : 'password'}
            label='Contraseña'
            placeholder='Contraseña'
            error={errors.password?.message as string}
            {...register('password')}
          />

          <InputField 
            type={showPassword ? 'text' : 'password'}
            label='Repite la contraseña'
            placeholder="Repite la contraseña"
            error={errors.confirmPassword?.message as string}
            {...register('confirmPassword')}
          />

          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)}/>
              Mostrar contraseña
          </label>
        </>
      )}

      <div className={styles.buttons}>
        {!isFirstStep && (
          <Button type="button" variant='secondary' onClick={handleBack}>
            Atrás
          </Button>
        )}

        {!isLastStep ? (
          <Button type="button" variant='primary' onClick={nextStep}>
            Siguiente
          </Button>
        ) : (
          <Button type="submit" variant='primary' disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrarme'}
          </Button>
        )}
      </div>
    </div>
  )
}