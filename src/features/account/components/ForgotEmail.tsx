import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

export default function ForgotEmail() {
  const { isLoading } = useAuth();
  const [recoveryInput, setRecoveryInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!recoveryInput) {
      setError('Introduce un correo electrónico o un número de teléfono válido.');
      return;
    }

    try {
      // Aquí iría la lógica para recuperar: await recoverAccount(recoveryInput);
      console.log('Solicitando recuperación para:', recoveryInput);
      // Redirigir a un paso de confirmación
    } catch (err) {
      setError('No se ha podido encontrar tu cuenta.');
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

        <h1 style={styles.title}>Encuentra tu correo</h1>
        <p style={styles.subtitle}>Introduce tu número de teléfono o correo de recuperación</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              required
              value={recoveryInput}
              onChange={(e) => setRecoveryInput(e.target.value)}
              style={styles.input}
              placeholder="Teléfono o correo"
              disabled={isLoading}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.actions}>
            <button 
              type="button" 
              style={styles.createAccountBtn} 
              onClick={() => navigate('/login')}
              disabled={isLoading}
            >
              Volver
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

// Mismos estilos exactos que el componente original
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
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginTop: '16px',
  },
  inputContainer: {
    marginBottom: '32px', // Mayor espacio porque no hay enlaces intermedios
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
    marginTop: '-24px',
    marginBottom: '24px',
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