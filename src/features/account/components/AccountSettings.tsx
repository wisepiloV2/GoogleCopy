import { useState } from 'react';
import styles from './AccountSettings.module.css';
import {ThemeChange} from './Apearance/ThemeChange';

type SettingsTab = 'appearance';
const IconPalette = () => (
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
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
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {activeTab === 'appearance' && <ThemeChange />}
        </div>
      </main>
    </div>
  );
}