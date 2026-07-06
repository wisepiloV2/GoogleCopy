import './TopBar.css';
import AppsMenu from '../topBar/AppsMenu';
import { useAuth } from './AuthContext';
import UserAvatar from '../topBar/UserAvatar';

export default function TopBar() {
    const { isLoggedIn, toggleLogin } = useAuth();
    return (
        <div className="top-bar-container">
        <a href="https://mail.google.com" className="top-bar-link">
            Gmail
        </a>
        <a href="https://images.google.com" className="top-bar-link">
            Imágenes
        </a>

        <div className="top-bar-actions">
            <AppsMenu />
            {isLoggedIn ? (<UserAvatar />) : (<button className="sign-in-button" onClick={toggleLogin}>Acceder</button>)}
        </div>
        </div>
  );
}