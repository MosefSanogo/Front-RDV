import React from 'react';
import { Users, UserCheck, UserPlus, Calendar } from 'lucide-react';
import '../styles/clientStats.css';
import type { ClientStatsProps } from '../../../config/Types';

const ClientStats: React.FC<ClientStatsProps> = ({
  totalClients,
  activeClients,
  newClients,
  totalAppointments
}) => {
  const stats = [
    {
      id: 1,
      label: 'Total clients',
      value: totalClients,
      icon: Users,
      color: 'var(--info)',
      description: 'Base de données clients'
    },
    {
      id: 2,
      label: 'Clients actifs',
      value: activeClients,
      icon: UserCheck,
      color: 'var(--success)',
      description: 'RDV dans les 30 jours'
    },
    {
      id: 3,
      label: 'Nouveaux clients',
      value: newClients,
      icon: UserPlus,
      color: 'var(--warning)',
      description: 'Ce mois-ci'
    },
    {
      id: 4,
      label: 'Total RDV',
      value: totalAppointments,
      icon: Calendar,
      color: 'var(--card-1)',
      description: 'Tous temps confondus'
    }
  ];

  return (
    <div className="client-stats">
      {stats.map(stat => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              <Icon size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClientStats;