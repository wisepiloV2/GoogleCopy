import { useEffect, useRef, useState } from "react";
import './AppsMenu.css';

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
];

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
        <svg focusable="false" viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: '#5f6368' }}>
          <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z" />
        </svg>
      </button>

      {isOpen && (
        <div className="apps-dropdown">
          {apps.map((app) => (
            <a key={app.name} href={app.url} className="app-item" target="_blank" rel="noopener noreferrer">
              <img
                src={`https://www.google.com/s2/favicons?domain=${app.url}&sz=64`}
                alt={`Ícono de ${app.name}`}
                className="app-icon"
              />
              <span className="app-name">{app.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}