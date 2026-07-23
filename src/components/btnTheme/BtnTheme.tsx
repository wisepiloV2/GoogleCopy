import { useTheme } from "../../context/ThemeContextType";
import './BtnTheme.css'

export function BtnTheme() {
    const { theme, toggleTheme } = useTheme();

    return  (
        <button className="btn-theme" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}