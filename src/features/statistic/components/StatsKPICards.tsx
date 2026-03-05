import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import '../styles/statsKPICards.css';
interface KPI {
  id: string;
  label: string;
  value: number | string;
  icon: React.ComponentType<{ size: number }>;
  color: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

interface StatsKPICardsProps {
  kpis: KPI[];
}

const StatsKPICards: React.FC<StatsKPICardsProps> = ({ kpis }) => {
  return (
    <div className="kpi-grid">
      {kpis.map(kpi => {
        const Icon = kpi.icon;
        
        return (
          <div key={kpi.id} className="kpi-card">
            <div className="kpi-icon" style={{ color: kpi.color }}>
              <Icon size={24} />
            </div>
            
            <div className="kpi-content">
              <div className="kpi-value" style={{ color: kpi.color }}>
                {kpi.value}
              </div>
              <div className="kpi-label">{kpi.label}</div>
              
              {kpi.trend && (
                <div className={`kpi-trend ${kpi.trend.direction}`}>
                  {kpi.trend.direction === 'up' ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                  <span>{kpi.trend.value}%</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsKPICards;