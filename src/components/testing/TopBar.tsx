import './TopBar.css';
import AppsMenu from '../topBar/AppsMenu';
import { useAuth } from './AuthContext';
import UserAvatar from './UserAvatar';
import UserDropdown from './UserDropdown';
import { useState } from 'react';

export default function TopBar() {
    const { isLoggedIn, toggleLogin } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="top-bar-container">
            <a href="https://mail.google.com" className="top-bar-link">Gmail</a>
            <a href="https://images.google.com" className="top-bar-link">Imágenes</a>

            <div className="top-bar-actions">
                <AppsMenu />
                {isLoggedIn ? (
                    <UserAvatar 
                        isOpen={isOpen} 
                        onToggle={() => setIsOpen(!isOpen)} // Para el botón
                        onClose={() => setIsOpen(false)}    // Para clics afuera (ESTRICTO)
                    >
                        <UserDropdown 
                            isOpen={isOpen} 
                            onClose={() => setIsOpen(false)} // El dropdown solo necesita cerrar
                        />
                    </UserAvatar>
                ) : (
                    <button className="sign-in-button" onClick={toggleLogin}>Acceder</button>
                )}
            </div>
        </div>
    );
}