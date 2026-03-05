import React, { useMemo } from 'react';
import '../styles/serviceDistributionChart.css';

interface DistributionData {
  name: string;
  value: number;
  color: string;
}

interface ServiceDistributionChartProps {
  data: DistributionData[];
}

const ServiceDistributionChart: React.FC<ServiceDistributionChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculer tous les chemins avant le rendu
  const paths = useMemo(() => {
    const result = [];
    let currentAngle = 0; // Variable locale dans useMemo
    
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle; // ✅ Fonctionne ici car dans une boucle normale
      
      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;
      
      const x1 = 50 + 40 * Math.cos(startRad);
      const y1 = 50 + 40 * Math.sin(startRad);
      const x2 = 50 + 40 * Math.cos(endRad);
      const y2 = 50 + 40 * Math.sin(endRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M 50 50`,
        `L ${x1} ${y1}`,
        `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`
      ].join(' ');
      
      result.push(
        <path
          key={i}
          d={pathData}
          fill={item.color}
          stroke="white"
          strokeWidth="1"
        />
      );
    }
    
    return result;
  }, [data, total]); // Recalculer quand les données changent

  return (
    <div className="distribution-chart">
      <div className="pie-container">
        <svg viewBox="0 0 100 100" className="pie-chart">
          {paths}
          <circle cx="50" cy="50" r="20" fill="var(--bg-card)" />
        </svg>
      </div>

      <div className="legend">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: item.color }} />
            <span className="legend-label">{item.name}</span>
            <span className="legend-value">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDistributionChart;