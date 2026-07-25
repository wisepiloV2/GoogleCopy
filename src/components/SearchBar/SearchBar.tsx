import { useState } from 'react';
import Styles from './SearchBar.module.css'

const SearchIcon = () => (
    <span className={Styles.searchIcon}>
        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
    </span>
);

interface SearchDropdownProps {
    suggestions: string[];
    onSelect: (suggestion: string) => void;
}

const SearchDropdown = ({ suggestions, onSelect }: SearchDropdownProps) => (
    <div className={Styles.searchDropdown}>
        <ul className={Styles.searchDropdownList} >
            {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                    <li 
                        key={index} 
                        className={Styles.searchDropdownItem}
                        onMouseDown={() => onSelect(suggestion)} 
                    >
                        <span className={Styles.searchDropdownItemText}>{suggestion}</span>
                        <span className={Styles.searchDropdownItemType}> - Búsqueda de Google</span>
                    </li>
                ))
            ) : (
                <li className={Styles.searchDropdownItem}>
                    <span className={Styles.searchDropdownItemText}>No hay resultados</span>
                </li>
            )}
        </ul>
    </div>
);

export default function SearchBar() {
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState('');

    const mockSuggestions = [
        "react tutorial",
        "react hooks",
        "como centrar un div",
        "clon de google css",
        "javascript map vs forEach"
    ];

    const filteredSuggestions = mockSuggestions.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className={Styles.searchContainer}>
            <form className={`${Styles.searchForm} ${isFocused ? Styles.focused : ''}`.trim()}>
                <SearchIcon />
                <input
                    type="text"
                    className={Styles.searchInput}
                    title="Buscar"
                    placeholder='Preguntar a Google'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)} 
                    onBlur={() => setIsFocused(false)} 
                />
                {isFocused && (
                    <SearchDropdown 
                        suggestions={filteredSuggestions} 
                        onSelect={setQuery} 
                    />
                )}
            </form>
        </div>
    )
}