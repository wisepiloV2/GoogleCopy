import { useSearchHistory } from '../hooks/useSearchHistory';
import styles from './SearchHistory.module.css';

export default function SearchHistory() {
  const { history, clearHistory } = useSearchHistory();

  return (
    <div className={styles.fadeIn}>
      <h2>Historial de búsqueda</h2>
      <p className={`${styles.subtitle} ${styles.mbLarge}`}>
        Revisa las búsquedas recientes que has realizado en tu cuenta.
      </p>
      
      <div className={styles.dataCard}>
        <div className={styles.dataList}>
          
          {history.length === 0 ? (
            <div className={styles.listItemHistory} style={{ justifyContent: 'center' }}>
              <p className={styles.subtitle}>No hay búsquedas recientes.</p>
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className={styles.listItemHistory}>
                <div className={styles.historyInfo}>
                  <h4>{item.search}</h4>
                  <p className={styles.subtitle}>{item.date}</p>
                </div>
                <span className={styles.time}>{item.time}</span>
              </div>
            ))
          )}

          {history.length > 0 && (
            <div className={styles.listItemAction}>
              <button 
                onClick={clearHistory} 
                className={styles.deleteButton} 
              >
                Eliminar historial
              </button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}