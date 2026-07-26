import { useTheme } from "../../../context/ThemeContextType";

export default function Appearance() {
  const { theme, toggleTheme } = useTheme();

  const ActiveBadge = () => (
    <div className="active-badge">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );

  return (
    <div className="fade-in">
      <h2>Aspecto</h2>
      <p className="subtitle mb-large">Elige cómo quieres que se vea la interfaz de tu cuenta.</p>
      
      <div className="theme-grid">
        <button 
          onClick={toggleTheme}
          className={`theme-card ${theme === 'light' ? 'active' : ''}`}
        >
          {theme === 'light' && <ActiveBadge />}
          <div className="theme-icon light">☀️</div>
          <span>Tema Claro</span>
        </button>

        <button 
          onClick={toggleTheme}
          className={`theme-card ${theme === 'dark' ? 'active' : ''}`}
        >
          {theme === 'dark' && <ActiveBadge />}
          <div className="theme-icon dark">🌙</div>
          <span>Tema Oscuro</span>
        </button>
      </div>
    </div>
  );
}