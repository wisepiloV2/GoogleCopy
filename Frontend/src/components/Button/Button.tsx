import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'unstyled';
  className?: string;
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  
  const buttonClass = [
    styles.btn, 
    variant !== 'unstyled' ? styles[variant] : '', 
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}