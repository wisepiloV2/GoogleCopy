import { MainLayout } from "../../components/Layout/MainLayout";
import { RegisterForm, useRegisterForm } from "../../features/authentication";
import { FormProvider } from 'react-hook-form';
import styles from './RegisterPage.module.css';

export function RegisterPage() {
  const { methods, onSubmit, isLoading, apiError } = useRegisterForm();
  
  return (
    <MainLayout>
      {isLoading && <div className={styles.loadingBar}></div>}

      <div className={styles.pageContainer}>
        
        <h1 className={styles.title}>Crear una cuenta</h1>
        
        {apiError && <p className={styles.errorMessage}>{apiError}</p>}
        
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className={styles.form}>
            <RegisterForm isLoading={isLoading} />
          </form>
        </FormProvider>
        
      </div>
    </MainLayout>
  );
}