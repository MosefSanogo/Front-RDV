import React from 'react';
import { 
  Power, 
  Trash2,
  MoreVertical,
  MapPin,
  Tag,
  Users,
  Calendar,
  Clock
} from 'lucide-react';
import './servicesTable.css';
import { useNavigate } from 'react-router-dom';
import type { SubService } from '../../../config/Types';


interface ServicesTableProps {
  subService: SubService[];
  onEdit?: (subService: SubService) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const ServicesTable: React.FC<ServicesTableProps> = ({
  subService,
  onDelete,
  onToggleStatus
}) => {
  const StatusBadge: React.FC<{ status: SubService['status'] }> = ({ status }) => {
    const config = {
      active: {
        label: 'ACTIF',
        color: 'var(--success)',
        bgColor: 'rgba(34, 197, 94, 0.1)'
      },
      inactive: {
        label: 'INACTIF',
        color: 'var(--error)',
        bgColor: 'rgba(239, 68, 68, 0.1)'
      }
    };
    
    const { label, color, bgColor } = config[status];
    
    return (
      <div 
        className="status-badge"
        style={{
          backgroundColor: bgColor,
          color: color,
          borderColor: color
        }}
      >
        {label}
      </div>
    );
  };

  const ActionMenu: React.FC<{ service: SubService }> = ({ service }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();  
    return (
      <div className="action-menu">
        <button 
          className="menu-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MoreVertical size={16} />
        </button>
        
        {isOpen && (
          <div className="menu-dropdown">
             <button 
              className="menu-item"
              onClick={() => {
                navigate(`/services/schedule/${service.id}`);
                setIsOpen(false);
              }}
            >
              <Clock size={14} />
              <span>Horaire</span>
            </button> 

            <button 
              className={`menu-item ${service.status === 'active' ? 'warning' : 'success'}`}
              onClick={() => {
                onToggleStatus(service.id);
                setIsOpen(false);
              }}
            >
              <Power size={14} />
              <span>{service.status === 'active' ? 'Désactiver' : 'Activer'}</span>
            </button>
            <button 
              className="menu-item danger"
              onClick={() => {
                onDelete(service.id);
                setIsOpen(false);
              }}
            >
              <Trash2 size={14} />
              <span>Supprimer</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  if (subService.length === 0) {
    return (
      <div className="empty-table">
        <div className="empty-content">
          <h3>Aucun sous-service trouvé</h3>
          <p>Créez votre premier sous-service pour commencer</p>
        </div>
      </div>
    );
  }

  return (
    <div className="services-table-container">
      <table className="services-table">
        <thead>
          <tr>
            <th className="name-col">SOUS-SERVICE</th>
            <th className="location-col">LOCALISATION</th>
            <th className="category-col">CATÉGORIE</th>
            <th className="capacity-col">CAPACITÉ</th>
            <th className="appointments-col">RDV AUJOURD'HUI</th>
            <th className="status-col">STATUT</th>
            <th className="actions-col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {subService.map(service => (
            <tr key={service.id} className="service-row">
              <td>
                <div className="service-info">
                  <div 
                    className="service-color"
                    style={{ backgroundColor: "var(--bg-card)"}}
                  />
                  <div className="service-details">
                    <div className="service-name">{service.name}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="location-cell">
                  <MapPin size={14} />
                  <span>{service.localisation}</span>
                </div>
              </td>
              <td>
                <div className="category-cell">
                  <Tag size={14} />
                  <span>{service.category}</span>
                </div>
              </td>
              <td>
                <div className="capacity-cell">
                  <Users size={14} />
                  <span>{service.capacity}/h</span>
                </div>
              </td>
              <td>
                <div className="appointments-cell">
                  <Calendar size={14} />
                  <span>{service.appointmentsToday}</span>
                </div>
              </td>
              <td>
                <StatusBadge status={service.status} />
              </td>
              <td>
                <ActionMenu service={service} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesTable;