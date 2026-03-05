import React from 'react';
import { Calendar } from 'lucide-react';
import '../styles/periodeSelector.css';
interface PeriodSelectorProps {
  selectedPeriod: 'day' | 'week' | 'month' | 'year' ;
  onPeriodChange: (period: 'day' | 'week' | 'month' | 'year') => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange
}) => {
  const periods: { id: 'day' | 'week' | 'month' | 'year', label: string }[] = [
    { id: 'day', label: 'Jour' },
    { id: 'week', label: 'Semaine' },
    { id: 'month', label: 'Mois' },
    { id: 'year', label: 'Année' }
  ];

  return (
    <div className="period-selector">
      <Calendar size={16} />
      <div className="period-buttons">
        {periods.map(period => (
          <button
            key={period.id}
            className={`period-btn ${selectedPeriod === period.id ? 'active' : ''}`}
            onClick={() => onPeriodChange(period.id)}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PeriodSelector;