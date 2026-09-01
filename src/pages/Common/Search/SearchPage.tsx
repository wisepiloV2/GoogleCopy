import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // 1. Importar useSearchParams
import { SearchInput } from '@/features/search/components/SearchInput';
import { SearchResult } from '@/features/search/components/SearchResult';
import { apiSearch } from '@/api/apiSearch';
import type { SearchResult as SearchResultType } from '@/api/types';
import { TopBar } from '@/components/Layout/TopBar/TopBar';
import styles from './SearchPage.module.css';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(urlQuery);
  const [results, setResults] = useState<SearchResultType[]>([]);

  useEffect(() => {
    async function fetchResults() {
      if (!urlQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        const data = await apiSearch(urlQuery);
        setResults(data);
      } catch (error) {
        console.error('Error realizando la búsqueda:', error);
      }
    }

    fetchResults();
    setQuery(urlQuery); 
  }, [urlQuery]); 

  function handleSearch() {
    if (!query.trim()) {
      return;
    }
    setSearchParams({ q: query.trim() }); 
  }

  return (
    <>
      <header>
          <TopBar logoView={true}>
              <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} style={{ width: '100%' }}>
                  <SearchInput
                    query={query}
                    setQuery={setQuery}
                    placeholder="Search"
                  />
              </form>
          </TopBar> 
        </header>

      <section className={styles.resultsContainer}>
        {results.map((result) => (
          <SearchResult
            key={result.url}
            title={result.title}
            url={result.url}
            snippet={result.snippet}
          />
        ))}
      </section>
    </>   
  );
}