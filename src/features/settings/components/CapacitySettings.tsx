import React, { useState } from "react";
import { Users, Clock, Calendar, TrendingUp, Info } from "lucide-react";
import '../styles/capacitySettings.css';
interface CapacitySettingsProps {
  initialCapacity?: number;
  onSave?: (settings: CapacitySettingsData) => void;
}

interface CapacitySettingsData {
  clientsPerHour: number;
  slotDuration: number;
  bufferTime: number;
  maxPerDay: number;
  maxPerSlot: number;
  allowOverbooking: boolean;
  overbookingLimit: number;
}

const CapacitySettings: React.FC<CapacitySettingsProps> = ({
  initialCapacity = 5,
}) => {
  const [settings, setSettings] = useState<CapacitySettingsData>({
    clientsPerHour: initialCapacity,
    slotDuration: 30,
    bufferTime: 5,
    maxPerDay: 50,
    maxPerSlot: 1,
    allowOverbooking: false,
    overbookingLimit: 2,
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (field: keyof CapacitySettingsData, value: string | number | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const calculateDailyCapacity = () => {
    // Simulation : 8 heures de travail * clients par heure
    return 8 * settings.clientsPerHour;
  };

  const calculateWeeklyCapacity = () => {
    return calculateDailyCapacity() * 6; // 6 jours ouvrés
  };

  const getSlotDurationLabel = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h${mins}` : `${hours}h`;
  };

  return (
    <div className="capacity-settings">
      <h2 className="section-title">
        <Users size={20} />
        Paramètres de capacité
      </h2>

      {/* Vue d'ensemble */}
      <div className="overview-cards">
        <div className="overview-card">
          <div
            className="overview-icon"
            style={{ background: "rgba(6, 182, 212, 0.1)", color: "#06B6D4" }}
          >
            <Calendar size={20} />
          </div>
          <div className="overview-content">
            <span className="overview-label">Capacité journalière</span>
            <span className="overview-value">{calculateDailyCapacity()}</span>
            <span className="overview-unit">clients / jour</span>
          </div>
        </div>

        <div className="overview-card">
          <div
            className="overview-icon"
            style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8B5CF6" }}
          >
            <TrendingUp size={20} />
          </div>
          <div className="overview-content">
            <span className="overview-label">Capacité hebdomadaire</span>
            <span className="overview-value">{calculateWeeklyCapacity()}</span>
            <span className="overview-unit">clients / semaine</span>
          </div>
        </div>
      </div>

      {/* Grille des paramètres */}
      <div className="settings-grid">
        {/* Clients par heure */}
        <div className="setting-card">
          <div className="setting-header">
            <Users size={18} />
            <h3>Clients par heure</h3>
          </div>
          <div className="setting-content">
            <div className="slider-container">
              <input
                type="range"
                min="1"
                max="20"
                value={settings.clientsPerHour}
                onChange={(e) =>
                  handleChange("clientsPerHour", parseInt(e.target.value))
                }
                className="slider"
              />
              <div className="value-display">
                <span className="value">{settings.clientsPerHour}</span>
                <span className="unit">/h</span>
              </div>
            </div>
            <p className="setting-description">
              Nombre maximum de clients pouvant être servis par heure
            </p>
          </div>
        </div>

        {/* Durée d'un créneau */}
        <div className="setting-card">
          <div className="setting-header">
            <Clock size={18} />
            <h3>Durée d'un créneau</h3>
          </div>
          <div className="setting-content">
            <div className="segmented-control">
              {[15, 30, 45, 60].map((duration) => (
                <button
                  key={duration}
                  className={`segment ${settings.slotDuration === duration ? "active" : ""}`}
                  onClick={() => handleChange("slotDuration", duration)}
                >
                  {getSlotDurationLabel(duration)}
                </button>
              ))}
            </div>
            <p className="setting-description">
              Durée standard d'un rendez-vous
            </p>
          </div>
        </div>

        {/* Temps tampon */}
        <div className="setting-card">
          <div className="setting-header">
            <Clock size={18} />
            <h3>Temps tampon</h3>
          </div>
          <div className="setting-content">
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="30"
                step="5"
                value={settings.bufferTime}
                onChange={(e) =>
                  handleChange("bufferTime", parseInt(e.target.value))
                }
                className="slider"
              />
              <div className="value-display">
                <span className="value">{settings.bufferTime}</span>
                <span className="unit">min</span>
              </div>
            </div>
            <p className="setting-description">
              Temps de pause entre deux rendez-vous
            </p>
          </div>
        </div>

        {/* Max par jour */}
        <div className="setting-card">
          <div className="setting-header">
            <Calendar size={18} />
            <h3>Max par jour</h3>
          </div>
          <div className="setting-content">
            <div className="number-input">
              <button
                className="number-btn"
                onClick={() =>
                  handleChange(
                    "maxPerDay",
                    Math.max(10, settings.maxPerDay - 5),
                  )
                }
              >
                -
              </button>
              <span className="number-value">{settings.maxPerDay}</span>
              <button
                className="number-btn"
                onClick={() =>
                  handleChange(
                    "maxPerDay",
                    Math.min(200, settings.maxPerDay + 5),
                  )
                }
              >
                +
              </button>
            </div>
            <p className="setting-description">
              Limite totale de rendez-vous par jour
            </p>
          </div>
        </div>

        {/* Overbooking */}
        <div className="setting-card full-width">
          <div className="setting-header">
            <h3>Options avancées</h3>
          </div>
          <div className="options-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.allowOverbooking}
                onChange={(e) =>
                  handleChange("allowOverbooking", e.target.checked)
                }
              />
              <span>Autoriser le surbooking</span>
            </label>

            {settings.allowOverbooking && (
              <div className="overbooking-control">
                <span className="control-label">Limite de surbooking:</span>
                <div className="number-input small">
                  <button
                    className="number-btn small"
                    onClick={() =>
                      handleChange(
                        "overbookingLimit",
                        Math.max(1, settings.overbookingLimit - 1),
                      )
                    }
                  >
                    -
                  </button>
                  <span className="number-value small">
                    {settings.overbookingLimit}
                  </span>
                  <button
                    className="number-btn small"
                    onClick={() =>
                      handleChange(
                        "overbookingLimit",
                        Math.min(5, settings.overbookingLimit + 1),
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <span className="control-hint">
                  clients supplémentaires par créneau
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Aperçu visuel */}
      <div className="preview-section">
        <button
          className="preview-toggle"
          onClick={() => setShowPreview(!showPreview)}
        >
          <Info size={16} />
          {showPreview ? "Masquer" : "Voir"} l'aperçu de la capacité
        </button>

        {showPreview && (
          <div className="capacity-preview">
            <h4>Aperçu de la journée type</h4>
            <div className="timeline-preview">
              {[...Array(8)].map((_, index) => {
                const hour = 8 + index;
                const slotsPerHour = 60 / settings.slotDuration;
                const totalSlots = Math.floor(
                  slotsPerHour * settings.clientsPerHour,
                );
                const filledSlots = Math.floor(
                  Math.random() * (totalSlots + 1),
                );
                const fillRate = totalSlots > 0 ? Math.round((filledSlots / totalSlots) * 100) : 0;

                return (
                  <div key={hour} className="hour-row">
                    <div className="hour-label">
                      {hour}h00 - {hour + 1}h00
                    </div>
                    <div className="slots-visual">
                      {[...Array(totalSlots)].map((_, slotIndex) => (
                        <div
                          key={slotIndex}
                          className={`slot-dot ${slotIndex < filledSlots ? "filled" : "empty"}`}
                          style={{
                            backgroundColor:
                              slotIndex < filledSlots
                                ? fillRate > 80
                                  ? "var(--error)"
                                  : fillRate > 50
                                    ? "var(--warning)"
                                    : "var(--success)"
                                : "var(--border-default)",
                          }}
                        />
                      ))}
                    </div>
                    <div className="hour-stats">
                      <span
                        className="fill-rate"
                        style={{
                          color:
                            fillRate > 80
                              ? "var(--error)"
                              : fillRate > 50
                                ? "var(--warning)"
                                : "var(--success)",
                        }}
                      >
                        {fillRate}%
                      </span>
                      <span className="slot-count">
                        {filledSlots}/{totalSlots}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="preview-legend">
              <div className="legend-item">
                <div
                  className="legend-dot"
                  style={{ background: "var(--success)" }}
                />
                <span>Disponible</span>
              </div>
              <div className="legend-item">
                <div
                  className="legend-dot"
                  style={{ background: "var(--warning)" }}
                />
                <span>Charge modérée</span>
              </div>
              <div className="legend-item">
                <div
                  className="legend-dot"
                  style={{ background: "var(--error)" }}
                />
                <span>Presque complet</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Note d'information */}
      <div className="info-note">
        <Info size={16} />
        <p>
          Ces paramètres déterminent comment les créneaux sont générés
          automatiquement. La capacité réelle peut varier selon les horaires
          d'ouverture configurés.
        </p>
      </div>
    </div>
  );
};

export default CapacitySettings;
