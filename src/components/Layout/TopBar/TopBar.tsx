import styles from './TopBar.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, type ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import AppsMenu from './AppsMenu';
import UserAvatar from './UserAvatar';
import UserDropdown from './UserDropdown';
import { Button } from '@/components/Button/Button';

interface TopbarProps {
  children: ReactNode;
}

export function TopBar({ children }: TopbarProps) {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={styles.topBarContainer}>
            {children}
            <div className={styles.topBarActions}>
                <AppsMenu />
                {user ? (
                    <UserAvatar 
                        isOpen={isOpen} 
                        onToggle={() => setIsOpen(!isOpen)} 
                        onClose={() => setIsOpen(false)}    
                    >
                        <UserDropdown 
                            isOpen={isOpen} 
                            onClose={() => setIsOpen(false)}
                        />
                    </UserAvatar>
                ) : (
                    <Button onClick={() => navigate('/auth/login')}>
                      Acceder
                    </Button>
                )}
            </div>
        </div>
    );
}