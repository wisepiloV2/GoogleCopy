import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from './InputField.module.css';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string; 
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type = 'text', error, className, ...props }, ref) => {
    const inputClass = [
      styles.input,
      error ? styles.inputError : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <div className={styles.inputContainer}>
        <label className={styles.label}>{label}</label>
        
        <input
          ref={ref}
          type={type}
          className={inputClass}
          autoComplete="off"
          {...props}
        />
        
        {error && (
          <span className={styles.errorText}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';