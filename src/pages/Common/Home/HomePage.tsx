import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogo from '@/components/GoogleLogo/GoogleLogo';
import { MainLayout } from '@/components/Layout/MainLayout';
import LinkBar from '@/components/Layout/TopBar/LinkBar';
import { TopBar } from '@/components/Layout/TopBar/TopBar';
import { SearchInput } from '@/features/search';
import { Button } from '@/components/Button/Button';
import styles from './HomePage.module.css';

function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  function handleSearch() {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <>
      <header>
        <TopBar logoView={false}></TopBar>
      </header>

      <MainLayout>

        <div className={styles.mainContainer}>
          <div className={styles.logoContainer}>
            <GoogleLogo size="6em" />
          </div>
          <form className={styles.searchContainer} onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <SearchInput
              query={query}
              setQuery={setQuery}
              placeholder=""
            />
            <div className={styles.buttonsContainer}>
              <Button variant="secondary" type="submit">
                Buscar con Google
              </Button>
            </div>
          </form>
        </div>
        
      </MainLayout>
    </>
  );
}

export { HomePage };

