import { MainLayout } from "../../components/Layout/MainLayout";
import { LoginForm, useLoginForm } from "../../features/authentication";
import { FormProvider } from 'react-hook-form';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const { methods, onSubmit, isLoading, apiError } = useLoginForm();
  
  return (
    <MainLayout>
      {isLoading && <div className={styles.loadingBar}></div>}

      <div className={styles.pageContainer}>
        
        <h1 className={styles.title}>Ingresar</h1>
        
        {apiError && <p className={styles.errorMessage}>{apiError}</p>}

        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className={styles.form}>
            <LoginForm isLoading={isLoading} />
          </form>
        </FormProvider>
        
      </div>
    </MainLayout>
  );
}