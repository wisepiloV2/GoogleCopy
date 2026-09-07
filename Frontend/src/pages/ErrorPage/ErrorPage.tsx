import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button/Button';
import styles from './ErrorPage.module.css';
import { MainLayout } from '@/components/Layout/MainLayout'; 

interface ErrorPageProps {
  title: string;
  subtitle: string;
}

export function ErrorPage({ title, subtitle }: ErrorPageProps) {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <Button variant='primary' onClick={() => navigate('/')}>
          Go home
        </Button>
      </div>
    </MainLayout>
  );
}