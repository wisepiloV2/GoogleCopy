import { useState } from 'react';
import { usePersonalInfo } from '../hooks/usePersonalInfo';
import styles from './PersonalInfo.module.css';

function EditableItem({ label, value, onSave, type = 'text' }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputValue(value); 
    setIsEditing(false);
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.listItem}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
        <button className={styles.editButton} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cerrar' : 'Editar'}
        </button>
      </div>
      
      {/* Sección Desplegable */}
      {isEditing && (
        <div className={styles.editDropdown}>
          <input 
            type={type} 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            className={styles.inputField}
          />
          <div className={styles.actionButtons}>
            <button onClick={handleCancel} className={styles.cancelBtn}>Cancelar</button>
            <button onClick={handleSave} className={styles.saveBtn}>Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
}


function PasswordEditableItem({ label, onInitChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.itemContainer}>
      <div className={styles.listItem}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>••••••••</span>
        <button className={styles.editButton} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cerrar' : 'Editar'}
        </button>
      </div>
      
      {isEditing && (
        <div className={styles.editDropdown}>
          <p className={styles.subtitle}>Ingresa tu nueva contraseña</p>
          <div className={styles.passwordInputWrapper}>
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={styles.inputField}
              placeholder="Nueva contraseña"
            />
            <button 
              type="button"
              className={styles.showPasswordBtn} 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          <div className={styles.actionButtons}>
            <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}>Cancelar</button>
            <button onClick={() => onInitChange(password)} className={styles.saveBtn}>Siguiente</button>
          </div>
        </div>
      )}
    </div>
  );
}


export default function PersonalInfo() {
  const { userData } = usePersonalInfo();

  const handleUpdate = (field, newValue) => {
    console.log(`Actualizando ${field} con:`, newValue);
  };

  return (
    <div className={styles.fadeIn}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>{userData.initial}</div>
        </div>
        <h2>{userData.name}</h2>
        <p className={styles.subtitle}>{userData.email}</p>
      </div>

      <div className={styles.dataCard}>
        <div className={styles.dataCardHeader}>
          <h3>Información básica</h3>
          <p className={styles.subtitle}>Algunos de estos datos pueden ser visibles para otras personas.</p>
        </div>
        
        <div className={styles.dataList}>
          <EditableItem 
            label="Nombre" 
            value={userData.name} 
            onSave={(val) => handleUpdate('name', val)} 
          />
          <EditableItem 
            label="Correo" 
            value={userData.email} 
            type="email"
            onSave={(val) => handleUpdate('email', val)} 
          />
          <EditableItem 
            label="Teléfono" 
            value={userData.phone} 
            type="tel"
            onSave={(val) => handleUpdate('phone', val)} 
          />
          <PasswordEditableItem 
            label="Contraseña"
            onInitChange={(newPass) => {
            }}
          />
        </div>
      </div>
    </div>
  );
}