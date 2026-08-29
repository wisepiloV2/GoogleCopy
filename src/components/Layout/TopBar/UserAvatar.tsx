import { useEffect, useRef, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from './UserAvatar.module.css';

interface UserAvatarProps {
  isOpen: boolean;
  onToggle: () => void; 
  onClose: () => void; 
  children: ReactNode;  
}

export default function UserAvatar({ isOpen, onToggle, onClose, children }: UserAvatarProps) {
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
    <div ref={containerRef} className={styles.container}>
      <button 
        className={styles.userAvatar} 
        onClick={onToggle} 
      >
        {user?.username.charAt(0)}
      </button>
      {isOpen && children}
    </div> 
  );
}