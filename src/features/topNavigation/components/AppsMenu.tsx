import { useEffect, useRef, useState } from "react";
import './AppsMenu.css';
import AppLink from "../../../components/appLink/AppLink";

interface AppItem {
  name: string;
  url: string;
}

const apps: AppItem[] = [
  { name: 'Maps', url: 'https://maps.google.com' },
  { name: 'YouTube', url: 'https://www.youtube.com' },
  { name: 'Gmail', url: 'https://mail.google.com' },
  { name: 'Meet', url: 'https://meet.google.com' },
  { name: 'Drive', url: 'https://drive.google.com' },
  { name: 'Traductor', url: 'https://translate.google.com' },
];

const BtnIcon = () => (
    <svg focusable="false" viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: '#5f6368' }}>
          <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z" />
    </svg>
);

export default function AppsMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="apps-menu-container" ref={menuRef}>
      <button
        className="apps-button"
        onClick={toggleMenu}
        aria-label="Aplicaciones de Google"
        aria-expanded={isOpen}
      >
        <BtnIcon/>
      </button>

      {isOpen && (
        <div className="apps-dropdown">
          <p className="apps-title">Más usadas</p>
          {apps.map((app, idx) => (
            < AppLink 
                key={idx} 
                name={app.name} 
                url={app.url} 
            />
          ))}
        </div>
      )}
    </div>
  );
}