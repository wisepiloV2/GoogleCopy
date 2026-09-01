import styles from './TopBar.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, type ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import AppsMenu from './AppsMenu';
import UserAvatar from './UserAvatar';
import UserDropdown from './UserDropdown';
import { Button } from '@/components/Button/Button';
import LinkBar from './LinkBar';
import GoogleLogo from '@/components/GoogleLogo/GoogleLogo';

interface TopbarProps {
  children?: ReactNode;
  logoView?: boolean; 
  position?: 'end' | 'space-between'; 
}

export function TopBar({ children, logoView = false, position = 'end' }: TopbarProps) {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={styles.topBarContainer} style={{ justifyContent: position === 'space-between' ? 'space-between' : 'flex-start' }}>
            
            { logoView && (
              <div className={styles.logoContainer}>
                <GoogleLogo size="1.5em"/>
              </div>
            )}
            
            {children && (
              <div className={styles.centerContent}>
                {children}
              </div>
            )}
            
            <div className={styles.topBarActions}>
                <div className={styles.topBarLink}>
                    <LinkBar />
                </div>
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