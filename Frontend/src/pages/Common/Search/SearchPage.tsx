import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchInput } from '@/features/search/components/SearchInput';
import { SearchResult } from '@/features/search/components/SearchResult';
import { apiSearch } from '@/api/apiSearch';
import type { SearchResult as SearchResultType } from '@/api/types';
import { TopBar } from '@/components/Layout/TopBar/TopBar';
import styles from './SearchPage.module.css';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
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
      } catch {
      }
    }

    fetchResults();
  }, [urlQuery]); 

  return (
    <>
      <header>
          <TopBar logoView={true}>
              <SearchInput placeholder="Search" />
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