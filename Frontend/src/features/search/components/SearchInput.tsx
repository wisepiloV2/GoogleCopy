import styles from './SearchInput.module.css';
import { SearchHistoryItem } from '@/features/account/components/History/SearchHistoryItem';
import { useSearchInput } from '../hooks/useSearchInput';

interface SearchInputProps {
  placeholder?: string; 
}

const SearchIcon = () => (
  <span className={styles.searchIcon}>
    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  </span>
);

export function SearchInput({ placeholder = "Search" }: SearchInputProps) {
  const {
    query,
    setQuery,
    wrapperRef,
    history,
    showDropdown,
    handleFocus,
    handleSelectHistoryItem,
    handleDeleteItem,
    handleKeyDown,
    handleSubmit
  } = useSearchInput();

  return (
    <form id="global-search-form" onSubmit={handleSubmit} style={{ width: '100%', position: 'relative' }}>
      <div 
        className={`${styles.container} ${showDropdown ? styles.containerOpen : ''}`} 
        ref={wrapperRef}
      >
        <SearchIcon />
        <input 
          type="text" 
          className={styles.input}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck="false"
        />

        {showDropdown && (
          <div className={styles.dropdown}>
            {history.slice(0, 10).map((item) => (
              <div 
                key={item.id} 
                className={styles.dropdownItemWrapper}
                onClick={() => handleSelectHistoryItem(item.searchTerm)}
              >
                <SearchHistoryItem 
                  item={item} 
                  onDelete={handleDeleteItem} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}