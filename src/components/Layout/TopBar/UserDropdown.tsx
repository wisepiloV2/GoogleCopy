import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import styles from './UserDropdown.module.css'; 
import { Button } from '../../Button/Button';

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDropdown({ isOpen, onClose }: UserDropdownProps) {
  if (!isOpen) return null;
  
  const { user, logout } = useAuth();

  if (!user) return null;

  const userInitial = user.username ? user.username.charAt(0).toUpperCase() : 'U';

  return (
    <div className={styles.dropdownContainer}>
      <Button variant='ghost' className={styles.dropdownCloseBtn} onClick={onClose}>
        &times;
      </Button>

      <div className={styles.dropdownHeader}>
        <span className={styles.dropdownEmail}>{user.email}</span>
        <button className={styles.dropdownUser}>{userInitial}</button>
        <span className={styles.dropdownName}>¡Hola, {user.username}!</span>
      </div>

      <div className={styles.dropdownManage}>
        <Link to={'/account/settings'} className={styles.btnManageAccount}>
          Gestiona tu cuenta
        </Link>
      </div>

      <hr className={styles.dropdownDivider} />

      <ul className={styles.dropdownMenuList}>
        <li className={styles.dropdownMenuItem} onClick={logout}>
          <span className={styles.dropdownIcon}>-</span> Cerrar sesión
        </li>
      </ul>

      <hr className={styles.dropdownDivider} />

      <div className={styles.dropdownFooter}>
        <a href="#privacidad">Política de Privacidad</a>
        <span>•</span>
        <a href="#terminos">Términos de Servicio</a>
      </div>
    </div>
  );
}