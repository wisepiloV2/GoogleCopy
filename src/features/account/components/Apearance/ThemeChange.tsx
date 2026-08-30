import { useTheme } from "@/context/ThemeContext";
import styles from "./ThemeChange.module.css";

export function ThemeChange() {
  const { theme, toggleTheme } = useTheme();

  const ActiveBadge = () => (
    <div className={styles.activeBadge}>
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );

  return (
    <div className={styles.fadeIn}>
      <h2>Aspecto</h2>
      <p className={`${styles.subtitle} ${styles.mbLarge}`}>
        Elige cómo quieres que se vea la interfaz de tu cuenta.
      </p>
      
      <div className={styles.themeGrid}>
        <button 
          onClick={toggleTheme}
          className={`${styles.themeCard} ${theme === 'light' ? styles.active : ''}`}
        >
          {theme === 'light' && <ActiveBadge />}
          <div className={`${styles.themeIcon} ${styles.light}`}>☀️</div>
          <span>Tema Claro</span>
        </button>

        <button 
          onClick={toggleTheme}
          className={`${styles.themeCard} ${theme === 'dark' ? styles.active : ''}`}
        >
          {theme === 'dark' && <ActiveBadge />}
          <div className={`${styles.themeIcon} ${styles.dark}`}>🌙</div>
          <span>Tema Oscuro</span>
        </button>
      </div>
    </div>
  );
}