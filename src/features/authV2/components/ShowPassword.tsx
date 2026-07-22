import { useId } from 'react';
import styles from './Form.module.css';

interface ShowPasswordProps {
    show: boolean;
    setShow: (show: boolean) => void; 
}

export function ShowPassword({ show, setShow }: ShowPasswordProps) {
    const checkboxId = useId(); 

    return (
        <div className={styles.checkboxGroup}>
            <input 
                type="checkbox" 
                id={checkboxId} 
                checked={show}
                onChange={(e) => setShow(e.target.checked)}
            />
            <label htmlFor={checkboxId}>Mostrar contraseña</label>
        </div>
    );
}