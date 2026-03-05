import React from 'react';
import '../styles/trendChart.css';
interface TrendData {
  month: string;
  appointments: number;
}

interface TrendChartProps {
  data: TrendData[];
}

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.appointments));
  const minValue = Math.min(...data.map(d => d.appointments));
  const range = maxValue - minValue;

  // Générer les points pour la ligne
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item.appointments - minValue) / range) * 80;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="trend-chart">
      <div className="chart-container">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="line-chart">
          {/* Grille */}
          <line x1="0" y1="20" x2="100" y2="20" stroke="var(--border-default)" strokeWidth="0.5" />
          <line x1="0" y1="40" x2="100" y2="40" stroke="var(--border-default)" strokeWidth="0.5" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="var(--border-default)" strokeWidth="0.5" />
          <line x1="0" y1="80" x2="100" y2="80" stroke="var(--border-default)" strokeWidth="0.5" />
          
          {/* Ligne de tendance */}
          <polyline
            points={points}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
          />
          
          {/* Points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((item.appointments - minValue) / range) * 80;
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill="var(--primary)"
              />
            );
          })}
        </svg>
      </div>

      <div className="x-axis">
        {data.map((item, index) => (
          <div key={index} className="axis-label">
            {item.month}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendChart;