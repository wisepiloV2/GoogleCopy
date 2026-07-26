import { useState } from 'react';
import './AccountSettings.css'; 
import PersonalInfo from './components/PersonalInfo';
import ActivityHistory from './components/ActivityHistory';
import Appearance from './components/Appearance';

type SettingsTab = 'personal' | 'history' | 'appearance';

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('personal');

  const IconUser = () => (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const IconHistory = () => (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const IconPalette = () => (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  );

  return (
    <div className="account-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h1 className="sidebar-title">Cuenta</h1>
        <nav className="nav-menu">
          <button
            onClick={() => setActiveTab('personal')}
            className={`nav-button ${activeTab === 'personal' ? 'active' : ''}`}
          >
            <IconUser /> Información personal
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`nav-button ${activeTab === 'history' ? 'active' : ''}`}
          >
            <IconHistory /> Historial de actividad
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`nav-button ${activeTab === 'appearance' ? 'active' : ''}`}
          >
            <IconPalette /> Aspecto
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="content-wrapper">
          {activeTab === 'personal' && <PersonalInfo />}
          {activeTab === 'history' && <ActivityHistory />}
          {activeTab === 'appearance' && <Appearance />}
        </div>
      </main>
    </div>
  );
}