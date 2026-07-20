import { useEffect, useRef, type ReactNode } from "react";
import { useAuth } from "../../../context/AuthProvider";

interface UserAvatarProps {
  isOpen: boolean;
  onToggle: () => void; 
  onClose: () => void; 
  children: ReactNode;  
}

const avatarButtonStyles: React.CSSProperties = {
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
  lineHeight: 0, 
  width: '32px', 
  height: '32px', 
  fontSize: '0.9rem',
};

const containerStyles: React.CSSProperties = {
  position: 'relative'
};

export default function UserAvatar({ isOpen, onToggle, onClose, children}: UserAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

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
    <div ref={containerRef} style={containerStyles}>
      <button 
        className='user-avatar' 
        onClick={onToggle} 
        style={avatarButtonStyles}
      >
        {user?.firstName.charAt(0)}
      </button>
      {isOpen && (children)}
    </div> 
  );
}