import './TopBar.css';
import AppsMenu from './AppsMenu'; 

export default function TopBar(){
  return (
    <header className="top-bar-container">
      <a href="https://mail.google.com" className="top-bar-link">
        Gmail
      </a>
      <a href="https://images.google.com" className="top-bar-link">
        Imágenes
      </a>

      <div className="top-bar-actions">
        
        <AppsMenu />

        <button 
          className="profile-button" 
          title="Cuenta de Google"
        >
          W 
        </button>
      </div>
    </header>
  );
};
