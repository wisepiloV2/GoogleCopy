import { type ReactNode } from 'react';
import Logo from '../../../components/logo/Logo'; 
import styles from './Form.module.css';

interface FormLayoutProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  children: ReactNode;      
  actions?: ReactNode;     
}

export function FormLayout({ title, subtitle, children, actions }: FormLayoutProps) {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        
        <div className={styles.cardBranding}>
          <Logo size="40px" />
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        <div className={styles.cardForm}>
          {children}
        </div>

      </div>

      {actions && (
        <div className={styles.formAction}>
          {actions}
        </div>
      )}
      
    </div>
  );
}