import styles from './Form.module.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function InputField({ label, id, ...props }: InputFieldProps) {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.inputLabel} htmlFor={id}>
        {label}
      </label>
      <input 
        id={id} 
        className={styles.inputBox} 
        {...props} 
      />
    </div>
  );
}