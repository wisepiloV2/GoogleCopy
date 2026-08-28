import { useState } from "react";
import { useFormSteps } from "../hooks/useFormSteps";
import { useFormContext } from "react-hook-form";
import { InputField } from './InputField';
import styles from './LoginForm.module.css'
import { Button } from "../../../components/Button/Button";
import { required } from "zod/v4-mini";

const STEP_EMAIL = 1;
const STEP_PASSWORD = 2;

export function LoginForm({ isLoading } : { isLoading?: boolean }){
  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    step,
    nextStep,
    handleBack,
    isFirstStep,
    isLastStep,
  } = useFormSteps({
    maxSteps: 2,
    fieldsByStep: {
      1: ['email'],
      2: ['password'],
    },
  });

  return (
    <div className={styles.container}>
      {step === STEP_EMAIL && (
        <InputField
          label="Email"
          placeholder="Escribe tu email"
          error={errors.email?.message as string}
          {...register('email', { required: 'El email es obligatorio' })}
        />
      )}

      {step === STEP_PASSWORD && (
        <>
          <InputField 
            type={showPassword ? 'text' : 'password'}
            label='Contraseña'
            placeholder='Contraseña'
            error={errors.password?.message as string}
            {...register('password', { required: 'La contraseña es obligatoria' })}
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
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        )}
      </div>
    </div>
  );
}