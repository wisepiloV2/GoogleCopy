import { useRef, useEffect, type ReactNode } from 'react';

interface UserAvatarProps {
  isOpen: boolean;
  onToggle: () => void; 
  onClose: () => void; 
  children: ReactNode;  
}

export default function UserAvatar({ isOpen, onToggle, onClose, children}: UserAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose(); 
      }
    };

    if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]); 

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button 
        className='user-avatar' 
        onClick={onToggle} 
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
          width: '32px', 
          height: '32px', 
          fontSize: '0.9rem',
        }}
      >
        W
      </button>
      {isOpen && (children)}
    </div>
  );
}