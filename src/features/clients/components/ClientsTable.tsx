import React from 'react';
import { 
  Phone, 
  Mail, 
  Calendar, 
  Eye,
  TrendingUp,
  UserX,
  UserCheck,
  UserPlus
} from 'lucide-react';
import '../styles/clientsTable.css';
import type { Client, ClientsTableProps } from '../../../config/Types';

const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  onViewClient,
  onSort,
  sortBy,
  sortOrder
}) => {
  const getStatusBadge = (status: Client['status']) => {
    const config = {
      active: {
        label: 'Actif',
        icon: UserCheck,
        color: 'var(--success)',
        bgColor: 'rgba(34, 197, 94, 0.1)'
      },
      inactive: {
        label: 'Inactif',
        icon: UserX,
        color: 'var(--error)',
        bgColor: 'rgba(239, 68, 68, 0.1)'
      },
      new: {
        label: 'Nouveau',
        icon: UserPlus,
        color: 'var(--warning)',
        bgColor: 'rgba(245, 158, 11, 0.1)'
      }
    };
    
    const { label, icon: Icon, color, bgColor } = config[status];
    
    return (
      <div className="status-badge" style={{ backgroundColor: bgColor, color, borderColor: color }}>
        <Icon size={12} />
        <span>{label}</span>
      </div>
    );
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Jamais';
    return date;
  };

  if (clients.length === 0) {
    return (
      <div className="empty-table">
        <div className="empty-content">
          <h3>Aucun client trouvé</h3>
          <p>Essayez d'ajuster vos filtres de recherche</p>
        </div>
      </div>
    );
  }

  return (
    <div className="clients-table-container">
      <table className="clients-table">
        <thead>
          <tr>
            <th className="name-col">
              <button 
                className="sort-header"
                onClick={() => onSort('name')}
              >
                Nom complet
                {sortBy === 'name' && (
                  <span className="sort-indicator">
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            </th>
            <th className="contact-col">Contact</th>
            <th className="stats-col">
              <button 
                className="sort-header"
                onClick={() => onSort('appointments')}
              >
                RDV
                {sortBy === 'appointments' && (
                  <span className="sort-indicator">
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            </th>
            <th className="stats-col">
              <button 
                className="sort-header"
                onClick={() => onSort('lastAppointment')}
              >
                Dernier RDV
                {sortBy === 'lastAppointment' && (
                  <span className="sort-indicator">
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            </th>
            <th className="status-col">Statut</th>
            <th className="actions-col"></th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id} className="client-row">
              <td>
                <div className="client-info">
                  <div className="client-avatar">
                    {client.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="client-details">
                    <div className="client-name">{client.fullName}</div>
                    {client.services.length > 0 && (
                      <div className="client-services">
                        {client.services.slice(0, 2).join(' • ')}
                        {client.services.length > 2 && (
                          <span className="services-more">
                            +{client.services.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td>
                <div className="contact-info">
                  <div className="contact-item">
                    <Phone size={12} />
                    <span>{client.phone}</span>
                  </div>
                  {client.email && (
                    <div className="contact-item">
                      <Mail size={12} />
                      <span className="contact-email">{client.email}</span>
                    </div>
                  )}
                </div>
              </td>
              <td>
                <div className="stats-cell">
                  <TrendingUp size={14} />
                  <span className="stats-number">{client.totalAppointments}</span>
                  {client.absences > 0 && (
                    <span className="stats-absences">
                      ({client.absences} absent)
                    </span>
                  )}
                </div>
              </td>
              <td>
                <div className="last-appointment">
                  <Calendar size={14} />
                  <span className="appointment-date">
                    {formatDate(client.lastAppointment)}
                  </span>
                </div>
              </td>
              <td>
                {getStatusBadge(client.status)}
              </td>
              <td>
                <button 
                  className="view-btn"
                  onClick={() => onViewClient(client,client.services[client.services.length-1] || "")}
                  title="Voir le détail"
                >
                  <Eye size={16} />
                  <span>Voir</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;