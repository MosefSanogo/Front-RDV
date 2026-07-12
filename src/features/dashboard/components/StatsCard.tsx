import React from 'react';
import { 
  Calendar, 
  Users, 
  Activity, 
  Clock 
} from 'lucide-react';
import './statsCard.css';

interface StatsCardProps {
  todayAppointments: number;
  totalClients: number;
  activeServices: number;
  availableSlots: number;
  isLoading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  todayAppointments,
  totalClients,
  activeServices,
  availableSlots,
  isLoading = false
}) => {
  const stats = [
    {
      id: 1,
      title: "Rendez-vous du jour",
      value: todayAppointments,
      icon: Calendar,
      color: "var(--info)",
      bgColor: "rgba(56, 189, 248, 0.1)",
      trend: null
    },
    {
      id: 2,
      title: "Total Clients",
      value: totalClients,
      icon: Users,
      color: "var(--success)",
      bgColor: "rgba(34, 197, 94, 0.1)",
      trend: null
    },
    {
      id: 3,
      title: "Services Actifs",
      value: activeServices,
      icon: Activity,
      color: "var(--warning)",
      bgColor: "rgba(245, 158, 11, 0.1)",
      trend: null
    },
    {
      id: 4,
      title: "Créneaux disponibles",
      value: availableSlots,
      icon: Clock,
      color: "var(--error)",
      bgColor: "rgba(239, 68, 68, 0.1)",
      trend: null
    }
  ];

  if (isLoading) {
    return (
      <div className="stats-grid">
        {[1, 2, 3, 4].map((id) => (
          <div 
            key={id} 
            className="stat-card loading"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div className="stat-icon-skeleton" />
            <div className="stat-content-skeleton">
              <div className="stat-title-skeleton" />
              <div className="stat-value-skeleton" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="stats-container">
      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.id}
              className="stat-card"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition)'
              }}
            >
              <div className="stat-header">
                <div 
                  className="icon-container"
                  style={{
                    backgroundColor: stat.bgColor,
                    color: stat.color,
                    borderRadius: 'var(--radius-lg)'
                  }}
                >
                  <Icon size={24} />
                </div>
              </div>
              
              <div className="stat-content">
                <h3 
                  className="stat-title"
                  style={{
                    color: 'var(--text-secondary)',
                    fontWeight: 500
                  }}
                >
                  {stat.title}
                </h3>
                <p 
                  className="stat-value"
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 600,
                    margin: 0
                  }}
                >
                  {stat.value.toLocaleString()}
                </p>
              </div>
              
              <div className="stat-decoration">
                <div 
                  className="accent-bar"
                  style={{
                    backgroundColor: stat.color,
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default StatsCard;