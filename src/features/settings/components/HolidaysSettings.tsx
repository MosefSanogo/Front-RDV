import React, { useState } from 'react';
import { CalendarX, Plus, Trash2, Edit, AlertCircle } from 'lucide-react';
import '../styles/holidaysSettings.css';
interface Holiday {
  id: string;
  date: string;
  label: string;
  type: 'full' | 'half';
}

const HolidaysSettings: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([
    { id: '1', date: '2026-01-01', label: 'Jour de l\'an', type: 'full' },
    { id: '2', date: '2026-09-22', label: 'Indépendance', type: 'full' },
    { id: '3', date: '2026-03-15', label: 'Maintenance technique', type: 'half' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    label: '',
    type: 'full' as 'full' | 'half'
  });

  const handleAdd = () => {
    if (!formData.date || !formData.label) return;

    const newHoliday: Holiday = {
      id: Date.now().toString(),
      ...formData
    };

    setHolidays(prev => [...prev, newHoliday]);
    setFormData({ date: '', label: '', type: 'full' });
    setShowForm(false);
  };

  const handleEdit = (holiday: Holiday) => {
    setFormData({
      date: holiday.date,
      label: holiday.label,
      type: holiday.type
    });
    setEditingId(holiday.id);
    setShowForm(true);
  };

  const handleUpdate = () => {
    if (!formData.date || !formData.label || !editingId) return;

    setHolidays(prev => prev.map(h => 
      h.id === editingId ? { ...h, ...formData } : h
    ));

    setFormData({ date: '', label: '', type: 'full' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette date ?')) {
      setHolidays(prev => prev.filter(h => h.id !== id));
    }
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="holidays-settings">
      <h2 className="section-title">
        <CalendarX size={20} />
        Dates chômées et fermetures
      </h2>

      <div className="info-card">
        <AlertCircle size={18} />
        <div className="info-text">
          <strong>Comment ça fonctionne ?</strong>
          <p>Les dates ajoutées ici seront exclues de la génération automatique des créneaux.</p>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      {!showForm ? (
        <button className="add-btn" onClick={() => setShowForm(true)}>
          <Plus size={16} />
          Ajouter une date chômée
        </button>
      ) : (
        <div className="form-card">
          <h3>{editingId ? 'Modifier' : 'Nouvelle'} date chômée</h3>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="label">Motif</label>
              <input
                type="text"
                id="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="Ex: Jour de l'an, Maintenance..."
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'full' | 'half' })}
                className="form-select"
              >
                <option value="full">Journée complète</option>
                <option value="half">Demi-journée</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button 
              className="btn secondary"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({ date: '', label: '', type: 'full' });
              }}
            >
              Annuler
            </button>
            <button 
              className="btn primary"
              onClick={editingId ? handleUpdate : handleAdd}
              disabled={!formData.date || !formData.label}
            >
              {editingId ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </div>
      )}

      {/* Liste des dates */}
      {holidays.length > 0 ? (
        <div className="holidays-list">
          <div className="list-header">
            <div className="header-cell">Date</div>
            <div className="header-cell">Motif</div>
            <div className="header-cell">Type</div>
            <div className="header-cell actions-cell">Actions</div>
          </div>

          {holidays.map(holiday => (
            <div key={holiday.id} className="list-item">
              <div className="item-cell">
                <span className="date-badge">{formatDate(holiday.date)}</span>
              </div>
              <div className="item-cell">
                <span className="holiday-label">{holiday.label}</span>
              </div>
              <div className="item-cell">
                <span className={`type-badge ${holiday.type}`}>
                  {holiday.type === 'full' ? 'Journée complète' : 'Demi-journée'}
                </span>
              </div>
              <div className="item-cell actions-cell">
                <button className="action-btn-svg" onClick={() => handleEdit(holiday)}>
                  <Edit size={16} />
                </button>
                <button className="action-btn-svg delete" onClick={() => handleDelete(holiday.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Aucune date chômée configurée</p>
        </div>
      )}
    </div>
  );
};

export default HolidaysSettings;