import React from 'react';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import './quickStats.css';
interface QuickStatsProps {
  total: number;
  served: number;
  absent: number;
  pending: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({
  total,
  served,
  absent,
  pending
}) => {
  const stats = [
    {
      id: 1,
      label: 'Total RDV',
      value: total,
      icon: Users,
      color: 'var(--info)'
    },
    {
      id: 2,
      label: 'Servis',
      value: served,
      icon: UserCheck,
      color: 'var(--success)'
    },
    {
      id: 3,
      label: 'Absents',
      value: absent,
      icon: UserX,
      color: 'var(--error)'
    },
    {
      id: 4,
      label: 'À venir',
      value: pending,
      icon: Clock,
      color: 'var(--warning)'
    }
  ];

  return (
    <div className="quick-stats">
      {stats.map(stat => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              <Icon size={20} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;