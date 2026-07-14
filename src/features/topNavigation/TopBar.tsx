import './TopBar.css';
import { Link } from 'react-router-dom';
import { useState, type ReactNode } from 'react';
import { useAuth } from '../../context/AuthProvider';
import AppsMenu from './components/AppsMenu';
import UserAvatar from './components/UserAvatar';
import UserDropdown from './components/UserDropdown';

interface TopbarProps {
  children: ReactNode;
}

export function TopBar({ children }: TopbarProps) {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="top-bar-container">

            {children}
            
            <div className="top-bar-actions">
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
                    //<Link to="/login" className="sign-in-button">Acceder</Link>
                    <a className="sign-in-button">Acceder</a>
                )}
            </div>
        </div>
    );
}