import { useState } from 'react';
import GoogleLogo from '@/components/GoogleLogo/GoogleLogo';
import { MainLayout } from '@/components/Layout/MainLayout';
import LinkBar from '@/components/Layout/TopBar/LinkBar';
import { TopBar } from '@/components/Layout/TopBar/TopBar';
import { SearchInput } from '@/components/SearchInput/SearchInput';
import { Button } from '@/components/Button/Button';
import styles from './HomePage.module.css';

function HomePage() {
  const [query, setQuery] = useState('');

  return (
    <>
      <header>
        <TopBar>
          <LinkBar />
        </TopBar> 
      </header>
      
      <MainLayout>
        <div className={styles.mainContainer}>
          
          <div className={styles.logoContainer}>
            <GoogleLogo size="6em" />
          </div>

          <div className={styles.searchContainer}>
            <SearchInput 
              query={query} 
              setQuery={setQuery} 
              placeholder="" 
            />
          </div>

          <div className={styles.buttonsContainer}>
            <Button variant="secondary">Buscar con Google</Button>
          </div>
          
        </div>
      </MainLayout>
    </>  
  );
}

export { HomePage };