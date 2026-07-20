import { useAuth } from '../../../context/AuthProvider';
import './UserDropdown.css'; 

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDropdown({ isOpen, onClose }: UserDropdownProps) {
  if (!isOpen) return null;
  
  const { user, logout } = useAuth();

  if (!user) return null;

  const userInitial = user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U';

  return (
    <div className="dropdown-container">
      <button className="dropdown-closeBtn" onClick={onClose}>
        &times;
      </button>

      <div className="dropdown-header">
        <span className="dropdown-email">{user.email}</span>
        <span className='dropdown-user'>{userInitial}</span>
        <span className="dropdown-name">¡Hola, {user.firstName}!</span>
      </div>

      <div className="dropdown-manage">
        <button className="btn-manage-account">
          Gestionar tu cuenta
        </button>
      </div>

      <hr className="dropdown-divider" />

      <ul className="dropdown-menu-list">
        <li className="dropdown-menu-item">
          <span className="dropdown-icon">+</span> Añadir otra cuenta
        </li>
        <li className="dropdown-menu-item" onClick={logout}>
          <span className="dropdown-icon">-</span> Cerrar sesión
        </li>
      </ul>

      <hr className="dropdown-divider" />

      <div className="dropdown-footer">
        <a href="#privacidad">Política de Privacidad</a>
        <span>•</span>
        <a href="#terminos">Términos de Servicio</a>
      </div>
    </div>
  );
}