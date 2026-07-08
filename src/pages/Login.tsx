import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 


export default function Login() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

  const mappedId = 
      email === 'wisepilo@gmail.com' ? '1' : 
      email === 'juan@gmail.com' ? '2' : '';

    if (!mappedId) {
      setError('No se pudo encontrar tu cuenta de Google (Prueba: wisepilo@gmail.com)');
      return;
    }

    try {
      await login(mappedId);
      navigate('/');
    } catch (err) {
      setError('Hubo un problema al iniciar sesión.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <div style={styles.logoContainer}>
          <span style={{ color: '#4285F4' }}>G</span>
          <span style={{ color: '#EA4335' }}>o</span>
          <span style={{ color: '#FBBC05' }}>o</span>
          <span style={{ color: '#4285F4' }}>g</span>
          <span style={{ color: '#34A853' }}>l</span>
          <span style={{ color: '#EA4335' }}>e</span>
        </div>

        <h1 style={styles.title}>Iniciar sesión</h1>
        <p style={styles.subtitle}>Ir a tu aplicación</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Correo electrónico o teléfono"
              disabled={isLoading}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.forgotContainer}>
            <a href="#" style={styles.link}>¿Has olvidado tu correo electrónico?</a>
          </div>

          <p style={styles.guestText}>
            No es tu ordenador? Usa el modo Invitado para iniciar sesión de forma privada.{' '}
            <a href="#" style={styles.link}>Más información</a>
          </p>

          <div style={styles.actions}>
            <button type="button" style={styles.createAccountBtn} disabled={isLoading}>
              Crear cuenta
            </button>
            <button type="submit" style={styles.submitBtn} disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Siguiente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '48px 40px 36px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    width: '100%',
    maxWidth: '450px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoContainer: {
    fontSize: '24px',
    fontWeight: '500',
    marginBottom: '16px',
    letterSpacing: '-0.5px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '400',
    color: '#202124',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    fontWeight: '400',
    color: '#202124',
    margin: '0 0 32px 0',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '13px 15px',
    fontSize: '16px',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  error: {
    color: '#d93025',
    fontSize: '12px',
    marginTop: '4px',
    marginBottom: '8px',
  },
  forgotContainer: {
    marginBottom: '32px',
  },
  link: {
    color: '#1a73e8',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '14px',
  },
  guestText: {
    fontSize: '14px',
    color: '#5f6368',
    lineHeight: '1.5',
    marginBottom: '32px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createAccountBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#1a73e8',
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '8px',
  },
  submitBtn: {
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 24px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    height: '36px',
    transition: 'background-color 0.2s',
  },
};