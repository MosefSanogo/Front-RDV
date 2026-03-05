import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  Clock, 
  Users, 
  Calendar,
  CalendarX,
  Bell,
  Shield,
  Save,
  Globe,
  AlertCircle
} from 'lucide-react';

import '../styles/settingsPage.css';
import GeneralSettings from '../components/GeneralSettings';
import BusinessHoursSettings from '../components/BusinessHoursSettings';
import HolidaysSettings from '../components/HolidaysSettings';
import RulesSettings from '../components/RulesSettings';
import CapacitySettings from '../components/CapacitySettings';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('general');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const tabs = [
    { id: 'general', label: 'Général', icon: Building2 },
    { id: 'hours', label: 'Horaires', icon: Clock },
    { id: 'capacity', label: 'Capacité', icon: Users },
    { id: 'holidays', label: 'Jours chômés', icon: CalendarX },
    { id: 'rules', label: 'Règles', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield }
  ];

  const handleSaveAll = () => {
    setIsSaving(true);
    setShowSuccess(false);
    
    // Simuler une sauvegarde
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      
      // Masquer le message après 3 secondes
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'hours':
        return <BusinessHoursSettings />;
      case 'capacity':
        return <CapacitySettings />;
      case 'holidays':
        return <HolidaysSettings />;
      case 'rules':
        return <RulesSettings />;
      case 'security':
        return <div className="coming-soon">Module Sécurité (à venir)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      {/* Header */}
      <header className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <Settings size={28} />
            Paramètres
          </h1>
          <p className="page-subtitle">
            Configurez le comportement global de votre système
          </p>
        </div>
        
        <div className="header-actions">
          <button 
            className="btn primary"
            onClick={handleSaveAll}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="spinner" />
                Sauvegarde...
              </>
            ) : (
              <>
                <Save size={18} />
                Enregistrer tout
              </>
            )}
          </button>
        </div>
      </header>

      {/* Message de succès */}
      {showSuccess && (
        <div className="success-message">
          <AlertCircle size={18} />
          <span>Configuration enregistrée avec succès !</span>
        </div>
      )}

      {/* Navigation par onglets */}
      <div className="settings-container">
        <div className="settings-sidebar">
          <nav className="tabs-nav">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  {tab.id === 'holidays' && (
                    <span className="tab-badge">3</span>
                  )}
                </button>
              );
            })}
          </nav>
          
          <div className="sidebar-footer">
            <div className="info-card">
              <Globe size={16} />
              <div className="info-content">
                <span className="info-label">Version</span>
                <span className="info-value">2.1.0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;