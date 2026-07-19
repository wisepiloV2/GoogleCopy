import { type ReactNode } from 'react';
import Logo from '../../../components/logo/Logo'; 
import './FormLayout.css'

interface FormLayoutProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  children: ReactNode;      
  actions?: ReactNode;     
}

export function FormLayout({ title, subtitle, children, actions }: FormLayoutProps) {
  return (
    <div className="form-container">
      <div className="form-card">
        
        <div className="card-branding">
          <Logo size="40px" />
          <h2 className="title">{title}</h2>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>

        <div className="card-form">
          {children}
        </div>

      </div>

      {actions && (
        <div className="form-action">
          {actions}
        </div>
      )}
      
    </div>
  );
}