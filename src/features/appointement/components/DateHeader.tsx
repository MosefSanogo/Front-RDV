import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import './dateHeader.css';
interface DateHeaderProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

const DateHeader: React.FC<DateHeaderProps> = ({ date, onDateChange }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const goToPreviousDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
    localStorage.setItem("appointmentDate", newDate.toISOString());
  };

  const goToNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
    localStorage.setItem("appointmentDate", newDate.toISOString());
  };

  const goToToday = () => {
    onDateChange(new Date());
    
  };

  return (
    <div className="date-header">
      <button 
        className="date-nav-btn"
        onClick={goToPreviousDay}
        title="Jour précédent"
      >
        <ChevronLeft size={20} />
      </button>
      
      <div className="date-display">
        <Calendar size={18} />
        <span className="date-text">{formatDate(date)}</span>
        {isToday(date) && (
          <span className="today-badge">Auj.</span>
        )}
      </div>
      
      <button 
        className="date-nav-btn"
        onClick={goToNextDay}
        title="Jour suivant"
      >
        <ChevronRight size={20} />
      </button>
      
      {!isToday(date) && (
        <button 
          className="today-btn"
          onClick={goToToday}
        >
          Auj.
        </button>
      )}
    </div>
  );
};

export default DateHeader;