import { useCallback, useState, type KeyboardEvent  } from 'react';
import { useFormContext } from 'react-hook-form';

interface UseFormStepsOptions {
  maxSteps: number;
  fieldsByStep: Record<number, readonly string[]>;
  onBack?: (step: number) => void;
}

export function useFormSteps({maxSteps, fieldsByStep, onBack}: UseFormStepsOptions) {
  const [step, setStep] = useState(1);
  const { trigger } = useFormContext();

  const nextStep = async () => {
    const fields = fieldsByStep[step];
    const valid = await trigger(fields);

    if (!valid) {
      return;
    }

    if (step < maxSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      const prevStep = step - 1;

      setStep(prevStep);

      onBack?.(prevStep);
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key !== 'Enter') {
        return;
      }

      if (step < maxSteps) {
        event.preventDefault();
        void nextStep();
      }
    },
    [step, maxSteps, nextStep],
  );

  return {
    step,
    setStep,
    nextStep,
    handleBack,
    handleKeyDown,
    isFirstStep: step === 1,
    isLastStep: step === maxSteps,
  };
}