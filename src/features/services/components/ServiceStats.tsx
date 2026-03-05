import React from 'react';
import { Building, Power, Layers, Calendar } from 'lucide-react';
import './serviceStats.css';
interface ServiceStatsProps {
  totalServices: number;
  activeServices: number;
  totalAppointments: number;
}

const ServiceStats: React.FC<ServiceStatsProps> = ({
  totalServices,
  activeServices,
  totalAppointments
}) => {
  const stats = [
    {
      id: 1,
      label: 'Sous-Services totaux',
      value: totalServices,
      icon: Building,
      color: 'var(--card-1)',
      description: 'Nombre total de sous-services'
    },
    {
      id: 2,
      label: 'Sous-Services actifs',
      value: activeServices,
      icon: Power,
      color: 'var(--success)',
      description: 'Sous-services actuellement actifs'
    },
    {
      id: 3,
      label: 'Sous-services inactifs',
      value: totalServices - activeServices,
      icon: Layers,
      color: 'var(--card-2)',
      description: 'Total des sous-services inactifs'
    },
    {
      id: 4,
      label: 'RDV aujourd\'hui',
      value: totalAppointments,
      icon: Calendar,
      color: 'var(--card-3)',
      description: 'Rendez-vous programmés'
    }
  ];

  return (
    <div className="service-stats">
      {stats.map(stat => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ color: stat.color }}>
                <Icon size={20} />
              </div>
              <div className="stat-numbers">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
            <div className="stat-description">
              {stat.description}
            </div>
            <div className="stat-progress">
              {stat.id === 2 ? (
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{
                      width: `${(activeServices / totalServices) * 100}%`,
                      backgroundColor: stat.color
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceStats;