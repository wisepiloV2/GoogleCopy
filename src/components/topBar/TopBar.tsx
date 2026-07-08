import './TopBar.css';
import { Link } from 'react-router-dom';
import AppsMenu from './AppsMenu';
import { useAuth } from '../../context/AuthContext';
import UserAvatar from './UserAvatar';
import UserDropdown from './UserDropdown';
import { useState } from 'react';

export default function TopBar() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="top-bar-container">
            <a href="https://mail.google.com" className="top-bar-link">Gmail</a>
            <a href="https://images.google.com" className="top-bar-link">Imágenes</a>

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
                    <Link to="/login" className="sign-in-button">Acceder</Link>
                )}
            </div>
        </div>
    );
}