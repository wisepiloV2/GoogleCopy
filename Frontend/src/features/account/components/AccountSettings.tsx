import { useState } from 'react';
import styles from './AccountSettings.module.css';
import { ThemeChange } from './Apearance/ThemeChange';
import { SearchHistoryManagement } from './History/SearchHistoryManagement';  
import { UserInfo } from './UserInfo/UserInfo';

type SettingsTab = 'appearance' | 'history' | 'userInfo';

const IconPalette = () => (
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

const IconHistory = () => (
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconUser = () => (
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export function AccountSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');

  return (
    <div className={styles.accountContainer}>
      <aside className={styles.sidebar}>
        <h1 className={styles.sidebarTitle}>Cuenta</h1>
        <nav className={styles.navMenu}>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`${styles.navButton} ${activeTab === 'appearance' ? styles.active : ''}`}
          >
            <IconPalette /> Aspecto
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`${styles.navButton} ${activeTab === 'history' ? styles.active : ''}`}
          >
            <IconHistory /> Historial
          </button>
          <button
            onClick={() => setActiveTab('userInfo')}
            className={`${styles.navButton} ${activeTab === 'userInfo' ? styles.active : ''}`}
          >
            <IconUser /> Información del usuario
          </button>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {activeTab === 'appearance' && <ThemeChange />}
          {activeTab === 'history' && <SearchHistoryManagement />}
          {activeTab === 'userInfo' && <UserInfo />}
        </div>
      </main>
    </div>
  );
}