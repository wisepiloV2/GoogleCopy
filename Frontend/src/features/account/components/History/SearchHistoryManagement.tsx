import styles from './SearchHistoryManagement.module.css';
import { SearchHistoryItem } from './SearchHistoryItem';
import { useSearchHistory } from '../../hooks/useSearchHistory';

export function SearchHistoryManagement(){
  const { history, isLoading, handleDeleteItem, handleDeleteAll } = useSearchHistory();

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleBox}>
          <h2>Historial de búsqueda</h2>
          <p>Tus búsquedas recientes se guardan aquí.</p>
        </div>
        
        {history.length > 0 && (
          <button 
            className={styles.deleteAllBtn} 
            onClick={handleDeleteAll}
          >
            Borrar todo
          </button>
        )}
      </header>

      <div className={styles.list}>
        {isLoading ? (
          <div className={styles.emptyState}>Cargando...</div>
        ) : history.length === 0 ? (
          <div className={styles.emptyState}>No tienes búsquedas recientes.</div>
        ) : (
          history.map((item) => (
            <SearchHistoryItem 
              key={item.id} 
              item={item} 
              onDelete={handleDeleteItem} 
            />
          ))
        )}
      </div>
    </section>
  );
};