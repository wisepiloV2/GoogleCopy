import { useState, useRef, useEffect } from 'react'; // ¡No olvides importar useRef y useEffect!
import './TopBar.css';
import AppsMenu from './AppsMenu'; 
import UserAvatar from './UserAvatar';
import UserDropdown from './UserDropdown';

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="top-bar-container">
      <a href="https://mail.google.com" className="top-bar-link">
        Gmail
      </a>
      <a href="https://images.google.com" className="top-bar-link">
        Imágenes
      </a>

      <div className="top-bar-actions">
        <AppsMenu />
        
        <div ref={userMenuRef} className="user-menu-wrapper">
          <UserAvatar onClick={() => setIsMenuOpen(!isMenuOpen)} size="small" />
          
          <UserDropdown 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)} 
          />
        </div>
      </div>
    </div>
  );
}