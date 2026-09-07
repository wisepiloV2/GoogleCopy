import GoogleLogo from '@/components/GoogleLogo/GoogleLogo';
import { MainLayout } from '@/components/Layout/MainLayout';
import { TopBar } from '@/components/Layout/TopBar/TopBar';
import { SearchInput } from '@/features/search';
import { Button } from '@/components/Button/Button';
import styles from './HomePage.module.css';

function HomePage() {

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
          
          <div className={styles.searchContainer}>

            <SearchInput placeholder="" />
            
            <div className={styles.buttonsContainer}>
              <Button variant="secondary" type="submit" form="global-search-form">
                Buscar con Google
              </Button>
            </div>
            
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export { HomePage };