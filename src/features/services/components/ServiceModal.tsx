import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Layers,
  Plus,
} from 'lucide-react';
import './serviceModal.css';
import type { Service_Info, SubService, SubService_Info } from '../../../config/Types';
// Types


interface ServiceModalProps {
  service?: SubService | null;
  onClose: () => void;
  onSave: (serviceData:SubService_Info[]) => void;
  serviceInfo?: Service_Info | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<string>('subservices');
  const [subServices, setSubServices] = useState<SubService_Info[]>([]);

  const handleSave = () => {
      onSave(subServices);
      console.log(subServices)
  };

  const handleAddSubService = () => {
    const newSubService: SubService_Info = {
      id: Date.now().toString(),
      nom: 'Nouveau sous-service',
      status: 'active',
    };
    setSubServices(prev => [...prev, newSubService]);
  };

  const handleUpdateSubService = (id: string, updates: Partial<SubService_Info>) => {
    setSubServices(prev => prev.map(sub => 
      sub.id === id ? { ...sub, ...updates } : sub
    ));
  };

  const handleDeleteSubService = (id: string) => {
    setSubServices(prev => prev.filter(sub => sub.id !== id));
  };


  const tabs = [
    { id: 'subservices', label: 'Sous-services', icon: Layers },
  ];

  return (
    <div className="service-modal-overlay" >
      <div className="service-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="header-left">
            <h2 className="modal-title">
              {service ? 'Modifier le service' : 'Nouveau service'}
            </h2>
            {service && (
              <div className="service-status">
                <div className={`status-badge ${service.status}`}>
                  {service.status === 'active' ? 'ACTIF' : 'INACTIF'}
                </div>
                <span className="service-id">ID: {service.id}</span>
              </div>
            )}
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="modal-content">
          <SubServiceManager
            subServices={subServices}
            onAdd={handleAddSubService}
            onUpdate={handleUpdateSubService}
            onDelete={handleDeleteSubService}
          />
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <div className="footer-info">
            {activeTab === 'subservices' && (
              <div className="info-note">
                <Layers size={14} />
                <span>{subServices.length} sous-service{subServices.length > 1 ? 's' : ''} configuré{subServices.length > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
          
          <div className="footer-actions">
            <button className="btn secondary" onClick={onClose}>
              Annuler
            </button>
            <button className="btn primary" onClick={() => handleSave()} disabled= {subServices.length === 0 && activeTab === 'subservices'}>
              <Save size={16} />
              {activeTab === 'info' ? 'Enregistrer les modifications' : 'Enregistrer le sous-service'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sous-composants
const SubServiceManager: React.FC<{
  subServices: SubService_Info[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<SubService_Info>) => void;
  onDelete?: (id: string) => void;
}> = ({ subServices, onAdd, onUpdate }) => {
  return (
    <div className="subservice-manager">
      <div className="manager-header">
        <h3>Sous-services</h3>
        <button className="btn small" onClick={onAdd}>
          <Plus size={14} />
          Ajouter
        </button>
      </div>

      {subServices.length === 0 ? (
        <div className="empty-state">
          <p>Aucun sous-service configuré</p>
          <button className="btn secondary small" onClick={onAdd}>
            <Plus size={14} />
            Ajouter un sous-service
          </button>
        </div>
      ) : (
        <div className="subservices-list">
          {subServices.map(sub => (
            <div key={sub.id} className="subservice-item">
              <div className="subservice-info">
                  <input
                    type="text"
                    value={sub.nom}
                    onChange={(e) => onUpdate(sub.id, { nom: e.target.value })}
                    className="edit-input"
                    autoFocus
                  />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceModal;