import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeContextType";
import { AppRouter } from "./router"; 
import './index.css';

export default function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <AppRouter />
            </ThemeProvider>
        </AuthProvider>
    );
}