import { useAuth } from './AuthContext';
import './UserDropdown.css'; 

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDropdown({ isOpen, onClose }: UserDropdownProps) {
  if (!isOpen) return null;
  const { toggleLogin } = useAuth();

  return (
    <div className="dropdown-container">
      <button className="dropdown-closeBtn" onClick={onClose}>
        &times;
      </button>

      <div className="dropdown-header">
        <span className="dropdown-email">usuario@ejemplo.com</span>
        <span className='dropdown-user'>W</span>
        <span className="dropdown-name">¡Hola, Wisepilo!</span>
      </div>

      <div className="dropdown-manage">
        <button className="btn-manage-account">
          Gestionar tu cuenta de Google
        </button>
      </div>

      <hr className="dropdown-divider" />

      <ul className="dropdown-menu-list">
        <li className="dropdown-menu-item">
          <span className="dropdown-icon">+</span> Añadir otra cuenta
        </li>
        <li className="dropdown-menu-item" onClick={toggleLogin}>
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