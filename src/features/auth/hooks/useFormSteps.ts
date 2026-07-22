import { useState } from 'react';

interface UseFormStepsOptions {
  maxSteps: number;
  onBack?: (step: number) => void;
}

export function useFormSteps({ maxSteps, onBack }: UseFormStepsOptions) {
  const [step, setStep] = useState<number>(1);

  const handleNext = (canProceed: boolean, nextAction?: () => void) => {
    if (canProceed) {
      if (step < maxSteps) {
        setStep((prev) => prev + 1);
      } else if (nextAction) {
        nextAction();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      const prevStep = step - 1;
      setStep(prevStep);
      if (onBack) onBack(prevStep);
    }
  };

  return {
    step,
    setStep,
    handleNext,
    handleBack,
    isFirstStep: step === 1,
    isLastStep: step === maxSteps,
  };
}