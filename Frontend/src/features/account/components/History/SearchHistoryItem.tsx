import styles from './SearchHistoryItem.module.css';

export interface HistoryItem {
  id: number;
  searchTerm: string;
  searchDate: string; 
}

interface SearchHistoryItemProps {
  item: HistoryItem;
  onDelete: (id: number) => void;
}
const SearchIcon = () => (
  <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export function SearchHistoryItem({ item, onDelete }: SearchHistoryItemProps){
  const formattedDate = new Date(item.searchDate).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className={styles.item}>
      <div className={styles.itemLeft}>
        <SearchIcon />
        <div className={styles.itemText}>
          <span className={styles.term}>{item.searchTerm}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
      </div>
      <button 
        className={styles.deleteBtn} 
        onClick={() => onDelete(item.id)}
        title="Eliminar del historial"
      >
        <CloseIcon />
      </button>
    </div>
  );
};