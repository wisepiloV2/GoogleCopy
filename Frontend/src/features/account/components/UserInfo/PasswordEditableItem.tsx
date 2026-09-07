import { useState } from 'react';
import styles from './PasswordEditableItem.module.css';
import { Button } from '@/components/Button/Button';

interface PasswordEditableItemProps {
  label: string;
  onInitChange: (newPassword: string) => void;
}

export function PasswordEditableItem({ label, onInitChange }: PasswordEditableItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get('password')?.toString();
    
    if (newPassword) {
      onInitChange(newPassword);
    }
    setIsEditing(false);
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.listItem}>
        <div className={styles.labelValueContainer}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>••••••••</span>
        </div>
        
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Editar</Button>
        )}
      </div>
      
      {isEditing && (
        <form onSubmit={handleSubmit} className={styles.editDropdown}>
          <p className={styles.subtitle}>Ingresa tu nueva contraseña</p>
          <div className={styles.passwordInputWrapper}>
            <input 
              name="password"
              type={showPassword ? 'text' : 'password'} 
              className={styles.inputField}
              placeholder="Nueva contraseña"
              required
              autoComplete="off"
            />
            <Button
              variant="unstyled" 
              type="button"
              className={styles.showPasswordBtn} 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </Button>
          </div>
          <div className={styles.actionButtons}>
            <Button type="button" onClick={() => setIsEditing(false)}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      )}
    </div>
  );
}