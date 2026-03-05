import React, { useState } from 'react';
import { Clock, Copy } from 'lucide-react';
import '../styles/businessHoursSettings.css';
interface DaySchedule {
  id: string;
  day: string;
  isActive: boolean;
  openTime: string;
  closeTime: string;
  capacity: number;
}

const BusinessHoursSettings: React.FC = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { id: '1', day: 'Lundi', isActive: true, openTime: '08:00', closeTime: '17:00', capacity: 5 },
    { id: '2', day: 'Mardi', isActive: true, openTime: '08:00', closeTime: '17:00', capacity: 5 },
    { id: '3', day: 'Mercredi', isActive: true, openTime: '08:00', closeTime: '12:00', capacity: 4 },
    { id: '4', day: 'Jeudi', isActive: true, openTime: '08:00', closeTime: '17:00', capacity: 5 },
    { id: '5', day: 'Vendredi', isActive: true, openTime: '08:00', closeTime: '17:00', capacity: 5 },
    { id: '6', day: 'Samedi', isActive: true, openTime: '09:00', closeTime: '13:00', capacity: 3 },
    { id: '7', day: 'Dimanche', isActive: false, openTime: '00:00', closeTime: '00:00', capacity: 0 }
  ]);

  const [copyFromDay, setCopyFromDay] = useState<string>('Lundi');

  const handleToggleDay = (dayId: string) => {
    setSchedule(prev => prev.map(day => 
      day.id === dayId ? { ...day, isActive: !day.isActive } : day
    ));
  };

  const handleTimeChange = (dayId: string, field: 'openTime' | 'closeTime', value: string) => {
    setSchedule(prev => prev.map(day => 
      day.id === dayId ? { ...day, [field]: value } : day
    ));
  };

  const handleCapacityChange = (dayId: string, value: number) => {
    setSchedule(prev => prev.map(day => 
      day.id === dayId ? { ...day, capacity: value } : day
    ));
  };

  const copySchedule = () => {
    const sourceDay = schedule.find(d => d.day === copyFromDay);
    if (sourceDay) {
      setSchedule(prev => prev.map(day => ({
        ...day,
        openTime: sourceDay.openTime,
        closeTime: sourceDay.closeTime,
        capacity: sourceDay.capacity
      })));
    }
  };

  const getActiveDaysCount = () => schedule.filter(d => d.isActive).length;

  return (
    <div className="business-hours">
      <h2 className="section-title">
        <Clock size={20} />
        Horaires d'ouverture
      </h2>

      <div className="hours-summary">
        <div className="summary-card">
          <span className="summary-label">Jours ouverts</span>
          <span className="summary-value">{getActiveDaysCount()}/7</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Capacité hebdo</span>
          <span className="summary-value">
            {schedule.reduce((sum, day) => 
              day.isActive ? sum + (parseInt(day.closeTime) - parseInt(day.openTime)) * day.capacity : sum
            , 0)} places
          </span>
        </div>
      </div>

      {/* Outil de copie */}
      <div className="copy-tool">
        <span className="copy-label">Copier les horaires de :</span>
        <select 
          value={copyFromDay}
          onChange={(e) => setCopyFromDay(e.target.value)}
          className="copy-select"
        >
          {schedule.map(day => (
            <option key={day.id} value={day.day}>{day.day}</option>
          ))}
        </select>
        <button className="copy-btn" onClick={copySchedule}>
          <Copy size={16} />
          Appliquer à tous
        </button>
      </div>

      {/* Tableau des horaires */}
      <div className="hours-table">
        <div className="table-header">
          <div className="header-cell">Jour</div>
          <div className="header-cell">Statut</div>
          <div className="header-cell">Ouverture</div>
          <div className="header-cell">Fermeture</div>
          <div className="header-cell">Capacité/heure</div>
        </div>

        <div className="table-body">
          {schedule.map(day => (
            <div key={day.id} className={`table-row ${!day.isActive ? 'inactive' : ''}`}>
              <div className="row-cell day-cell">{day.day}</div>
              
              <div className="row-cell">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={day.isActive}
                    onChange={() => handleToggleDay(day.id)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="row-cell">
                <input
                  type="time"
                  value={day.openTime}
                  onChange={(e) => handleTimeChange(day.id, 'openTime', e.target.value)}
                  disabled={!day.isActive}
                  className="time-input"
                />
              </div>
              
              <div className="row-cell">
                <input
                  type="time"
                  value={day.closeTime}
                  onChange={(e) => handleTimeChange(day.id, 'closeTime', e.target.value)}
                  disabled={!day.isActive}
                  className="time-input"
                />
              </div>
              
              <div className="row-cell">
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={day.capacity}
                  onChange={(e) => handleCapacityChange(day.id, parseInt(e.target.value) || 1)}
                  disabled={!day.isActive}
                  className="capacity-input"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-note">
        <p>
          <strong>Note :</strong> Les créneaux sont automatiquement générés selon ces horaires.
          Les jours inactifs ne produiront aucun créneau.
        </p>
      </div>
    </div>
  );
};

export default BusinessHoursSettings;