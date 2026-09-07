import { useState } from 'react';
import { useUserInfo } from '@/features/account/hooks/useUserInfo';
import styles from './UserInfo.module.css';
import { EditableItem } from './EditableItem';
import { Button } from '@/components/Button/Button';
import { PasswordEditableItem } from './PasswordEditableItem';

export function UserInfo() {
  const { user, updateEmail, updateUsername, updatePhone, updatePassword, checkPassword } = useUserInfo();
  
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');

  const handleUnlock = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const passwordInput = formData.get('password')?.toString();

    if (!passwordInput) return;

    checkPassword(passwordInput).then(isValid => {
      if (isValid) {
        setIsUnlocked(true);
      } else {
        setError('Contraseña incorrecta. Inténtalo de nuevo.');
      }
    }).catch(() => {
      setError('Ocurrió un error. Inténtalo de nuevo.');
    });
  };

  return (
    <div className={styles.fadeIn}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>{user?.username?.charAt(0) || '?'}</div>
        </div>
        <h2>{user?.username}</h2>
        <p className={styles.subtitle}>{user?.email}</p>
      </div>

      <div className={styles.dataCard}>
        <div className={styles.dataCardHeader}>
          <h3>Información básica</h3>
          <p className={styles.subtitle}>Algunos de estos datos pueden ser visibles para otras personas.</p>
        </div>
        
        {!isUnlocked ? (
          <div className={styles.lockedContainer}>
            <div className={styles.lockedContent}>
              <svg className={styles.lockIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h4>Desbloquear configuración</h4>
              <p className={styles.lockedText}>Por tu seguridad, ingresa tu contraseña para ver y editar esta información.</p>
              
              <form onSubmit={handleUnlock} className={styles.unlockForm}>
                <input 
                  name="password"
                  type="password" 
                  placeholder="Contraseña"
                  className={styles.passwordInput}
                  required
                  autoFocus
                  autoComplete="off"
                />
                {error && <span className={styles.errorMessage}>{error}</span>}
                <Button type="submit">Desbloquear</Button>
              </form>
              
            </div>
          </div>
        ) : (
          <div className={styles.dataList}>
            <EditableItem 
              label="Nombre" 
              value={user?.username} 
              onSave={updateUsername} 
            />
            <EditableItem 
              label="Correo" 
              value={user?.email} 
              type="email"
              onSave={updateEmail} 
            />
            <EditableItem 
              label="Teléfono" 
              value={user?.phone} 
              type="tel"
              onSave={updatePhone} 
            />
            <PasswordEditableItem 
              label="Contraseña" 
              onInitChange={updatePassword} 
            />
          </div>
        )}
      </div>
    </div>
  );
}