import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { isLoading } = useAuth(); // Asumiendo que register puede estar en AuthContext
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      // Aquí iría tu lógica de registro: await register(formData);
      console.log('Registrando usuario:', formData);
      navigate('/login');
    } catch (err) {
      setError('Hubo un problema al crear la cuenta.');
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

        <h1 style={styles.title}>Crear tu cuenta</h1>
        <p style={styles.subtitle}>Ir a tu aplicación</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={{ ...styles.inputContainer, flex: 1, marginRight: '8px' }}>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                style={styles.input}
                placeholder="Nombre"
                disabled={isLoading}
              />
            </div>
            <div style={{ ...styles.inputContainer, flex: 1 }}>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                style={styles.input}
                placeholder="Apellidos"
                disabled={isLoading}
              />
            </div>
          </div>

          <div style={styles.inputContainer}>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Correo electrónico"
              disabled={isLoading}
            />
          </div>

          <div style={styles.row}>
            <div style={{ ...styles.inputContainer, flex: 1, marginRight: '8px' }}>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                placeholder="Contraseña"
                disabled={isLoading}
              />
            </div>
            <div style={{ ...styles.inputContainer, flex: 1 }}>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
                placeholder="Confirmar"
                disabled={isLoading}
              />
            </div>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <p style={styles.guestText}>
            Usa 8 o más caracteres con una combinación de letras, números y símbolos.
          </p>

          <div style={styles.actions}>
            <button 
              type="button" 
              style={styles.createAccountBtn} 
              onClick={() => navigate('/login')}
              disabled={isLoading}
            >
              Iniciar sesión en su lugar
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

// Los estilos son idénticos al Login, solo se agregó 'row' para los inputs paralelos
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
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputContainer: {
    marginBottom: '16px',
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
  guestText: {
    fontSize: '12px',
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