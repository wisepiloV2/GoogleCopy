import { MainLayout } from "../../components/Layout/MainLayout";
import { RegisterForm, useRegisterForm } from "../../features/authentication";
import { FormProvider } from 'react-hook-form';
import GoogleLogo from '@/components/GoogleLogo/GoogleLogo';
import styles from './RegisterPage.module.css';

export function RegisterPage() {
  const { methods, onSubmit, isLoading, apiError } = useRegisterForm();
  
  return (
    <MainLayout>
      <div className={styles.pageContainer}>
        
        <div className={styles.registerCard}>
          {isLoading && <div className={styles.loadingBar}></div>}
          
          <div className={styles.leftCol}>
            <div><GoogleLogo size="3em" /></div>
            <h1 className={styles.title}>Crear una cuenta</h1>
            <p className={styles.subtitle}>Crea tu cuenta de Google</p>
          </div>

          <div className={styles.rightCol}>
            {apiError && <p className={styles.errorMessage}>{apiError}</p>}
            
            <FormProvider {...methods}>
              <form onSubmit={onSubmit} className={styles.form}>
                <RegisterForm isLoading={isLoading} />
              </form>
            </FormProvider>
          </div>
          
        </div>
        
      </div>
    </MainLayout>
  );
}