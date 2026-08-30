import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './router/AppRouter';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AuthProvider>
      <StrictMode>
        <AppRouter />
      </StrictMode>
    </AuthProvider>
  </ThemeProvider>,
)