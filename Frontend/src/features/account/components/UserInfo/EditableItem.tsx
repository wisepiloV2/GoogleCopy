import { useState } from 'react';
import styles from './EditableItem.module.css';
import { Button } from '@/components/Button/Button';

interface EditableItemProps {
  label: string;
  value: string | undefined;
  onSave: (newValue: string) => void;
  type?: string; 
}

export function EditableItem({ label, value, onSave, type = 'text' }: EditableItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newValue = formData.get('inputValue')?.toString();
    
    if (newValue !== undefined) {
      onSave(newValue); 
    }
    setIsEditing(false);
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.listItem}>
        <div className={styles.labelValueContainer}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{value}</span>
        </div>
        
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Editar</Button>
        )}
      </div>
      
      {isEditing && (
        <form onSubmit={handleSave} className={styles.editDropdown}>
          <input 
            name="inputValue"
            type={type} 
            defaultValue={value} 
            className={styles.inputField}
          />
          <div className={styles.actionButtons}>
            <Button type="button" onClick={() => setIsEditing(false)}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      )}
    </div>
  );
}