import { useRef, useEffect, type ReactNode } from 'react';

interface UserAvatarProps {
  isOpen: boolean;
  onToggle: () => void; // NUEVO: Función para alternar estado
  onClose: () => void;  // CORREGIDO: Función exclusiva para cerrar
  children: ReactNode; 
  size?: 'small' | 'large'; 
}

export default function UserAvatar({ isOpen, onToggle, onClose, children, size = 'small' }: UserAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Validamos si hicimos clic fuera del div que tiene el ref
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose(); // CORREGIDO: ¡Faltaban los paréntesis para ejecutarla!
      }
    };

    // OPTIMIZACIÓN: Solo escuchamos el clic si el menú está abierto
    if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]); // Agregamos las dependencias al useEffect

  const sizeStyles = size === 'large' ? {
    width: '86px', height: '86px', fontSize: '2.5rem',
  } : {
    width: '32px', height: '32px', fontSize: '0.9rem',
  };

  return (
    // CORREGIDO: Agregamos un div contenedor y le atamos el Ref.
    // position: relative ayuda a que el dropdown se ubique bien debajo.
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button 
        className='user-avatar' 
        onClick={onToggle} // CORREGIDO: Usamos onToggle directamente
        style={{
          backgroundColor: '#e53935', 
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'box-shadow 0.2s',
          lineHeight: '0',
          ...sizeStyles
        }}
      >
        W
      </button>
      {isOpen && (children)}
    </div>
  );
}