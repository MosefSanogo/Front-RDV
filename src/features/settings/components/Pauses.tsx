import React, { useState } from "react";
import { CalendarX, Plus, Trash2, AlertCircle, Save } from "lucide-react";
import "../styles/holidaysSettings.css";
import { sanitizeInput } from "../../../utils/Sanitize";
import type { SousService } from "./BusinessHoursSettings";
export interface Pauses {
  id: string;
  heure_debut: string;
  heure_fin: string;
  sous_service_id: string;
  sous_service_name?: string
}
interface HolidaysSettingsProps {
  onSave: (data: Pauses) => void;
  loading?: boolean;
  data: Pauses[];
  sousServices: SousService[]
  onAction?: (id: string) => void;

}

const PausesSettings: React.FC<HolidaysSettingsProps> = ({
  onSave,
  loading,
  data = [],
  sousServices= [],
  onAction
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    heure_debut: "",
    heure_fin: "",
    sous_service_id: "",
  });
  const handleSave = () => {
      const newHoliday: Pauses = {
        id: Date.now().toString(),
        ...formData,
      };
      console.log(newHoliday)
      onSave(newHoliday);
    
    setFormData({ heure_debut: "", heure_fin: "", sous_service_id: "" });
  };
  const handleAdd = () => {
    if (!formData.sous_service_id || !formData.heure_debut || !formData.heure_fin) return;
    setShowForm(false);
  };


  const handleDelete = (id: string) => {
    onAction?.(id);
  };

  return (
    <div className="holidays-settings">
      <div className="holidays-header">
        <h2 className="section-title">
          <CalendarX size={20} />
          Horaires des pauses
        </h2>

        <div className="header-actions">
          <button
            className="btn primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" />
                Sauvegarde...
              </>
            ) : (
              <>
                <Save size={18} />
                Enregistrer tout
              </>
            )}
          </button>
        </div>
      </div>
      <div className="info-card">
        <AlertCircle size={18} />
        <div className="info-text">
          <strong>Comment ça fonctionne ?</strong>
          <p>
            Les horaires ajoutées ici seront exclues de la génération automatique
            des créneaux.
          </p>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      {!showForm ? (
        <button className="add-btn" onClick={() => setShowForm(true)}>
          <Plus size={16} />
          Ajouter un intervalle de pause
        </button>
      ) : (
        <div className="form-card">
          <h3>{editingId ? "Modifier" : "Nouvelle"} horaire de pause</h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="date">Heure de début</label>
              <input
                type="time"
                id="date"
                value={formData.heure_debut}
                onChange={(e) =>
                  setFormData({ ...formData, heure_debut: e.target.value })
                }
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="label">Heure de fin</label>
              <input
                type="time"
                id="label"
                value={formData.heure_fin}
                onChange={(e) =>
                  setFormData({ ...formData, heure_fin: sanitizeInput(e.target.value).value as string })
                }
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Sous service</label>
              <select
                id="type"
                value={formData.sous_service_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sous_service_id: e.target.value,
                  })
                }
                className="form-select"
              > 
                <option >Selectionnez un sous service</option>
                {sousServices.map((item,i)=>(<option value={item.id} key={i}>{item.nom}</option>))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              className="btn secondary"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({ heure_debut: "", heure_fin: "", sous_service_id: "" });
              }}
            >
              Annuler
            </button>
            <button
              className="btn primary"
              onClick={handleAdd}
              disabled={!formData.heure_debut || !formData.heure_fin || !formData.sous_service_id}
            >
              {"Ajouter"}
            </button>
          </div>
        </div>
      )}

      {/* Liste des dates */}
      {data.length > 0 ? (
        <div className="holidays-list">
          <div className="list-header">
            <div className="header-cell">Sous service</div>
            <div className="header-cell">Heure de debut</div>
            <div className="header-cell">heure de fin</div>
            <div className="header-cell actions-cell">Actions</div>
          </div>

          {data.map((holiday) => (
            <div key={holiday.id} className="list-item">
              <div className="item-cell">
                <span className={`holiday-label`}>
                  { holiday.sous_service_name}
                </span>
              </div>  
              <div className="item-cell">
                <span className="holiday-label">{holiday.heure_debut}</span>
              </div>
              <div className="item-cell">
                <span className="holiday-label">{holiday.heure_fin}</span>
              </div>
              <div className="item-cell actions-cell">
                <button
                  className="action-btn-svg delete"
                  onClick={() => handleDelete(holiday.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Aucune horaire configurée</p>
        </div>
      )}
    </div>
  );
};

export default PausesSettings;
