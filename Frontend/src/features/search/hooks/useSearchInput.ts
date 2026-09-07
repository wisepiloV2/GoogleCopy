import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useSearchHistory } from '@/features/account/hooks/useSearchHistory';

export function useSearchInput() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 
  const { history, handleDeleteItem } = useSearchHistory();

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const executeSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setIsDropdownOpen(false);
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleFocus = () => setIsDropdownOpen(true);

  const handleSelectHistoryItem = (searchTerm: string) => {
    setQuery(searchTerm);
    executeSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeSearch(query);
    }
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  const showDropdown = isDropdownOpen && isAuthenticated && history.length > 0;

  return {
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
  };
}