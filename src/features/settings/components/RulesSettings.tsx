import React, { useState } from "react";
import { Calendar, Clock, Users, AlertCircle, Save } from "lucide-react";
import "../styles/rulesSettings.css";

export interface Rule {
  minDelay: number;
  maxAdvance: number;
  maxPerDay: number;
  cancellationDelay: number;
  allowWeekends: boolean;
  autoConfirm: boolean;
}
interface RulesSettingsProps {
  loading?: boolean;
  onSave?: (rules: Rule) => void;
  data: Rule;
}
const RulesSettings: React.FC<RulesSettingsProps> = ({
  loading = false,
  onSave,
  data,
}) => {
  const [rules, setRules] = useState<Rule>({
    minDelay: data?.minDelay || 2,
    maxAdvance: data?.maxAdvance || 30,
    maxPerDay: data?.maxPerDay || 1,
    cancellationDelay: data?.cancellationDelay || 24,
    allowWeekends: data?.allowWeekends || false,
    autoConfirm: data?.autoConfirm || true,
  });

  const handleChange = (field: string, value: string | number | boolean) => {
    setRules((prev) => ({ ...prev, [field]: value }));
  };
  const handleSave = () => {
    onSave?.(rules);
  };

  return (
    <div className="rules-settings">
      <div className="rules-header">
        <h2 className="section-title">
          <Calendar size={20} />
          Règles automatiques
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
      <div className="rules-grid">
        {/* Délai minimum */}
        <div className="rule-card">
          <div className="rule-header">
            <Clock size={18} />
            <h3>Délai minimum avant RDV</h3>
          </div>
          <div className="rule-content">
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="24"
                value={rules.minDelay}
                onChange={(e) =>
                  handleChange("minDelay", parseInt(e.target.value))
                }
                className="rule-slider"
              />
              <div className="value-display">
                <span className="value">{rules.minDelay}</span>
                <span className="unit">heures</span>
              </div>
            </div>
            <p className="rule-description">
              Les clients ne peuvent pas prendre RDV moins de {rules.minDelay}h
              à l'avance
            </p>
          </div>
        </div>

        {/* Délai maximum */}
        <div className="rule-card">
          <div className="rule-header">
            <Calendar size={18} />
            <h3>Délai maximum</h3>
          </div>
          <div className="rule-content">
            <div className="slider-container">
              <input
                type="range"
                min="1"
                max="90"
                value={rules.maxAdvance}
                onChange={(e) =>
                  handleChange("maxAdvance", parseInt(e.target.value))
                }
                className="rule-slider"
              />
              <div className="value-display">
                <span className="value">{rules.maxAdvance}</span>
                <span className="unit">jours</span>
              </div>
            </div>
            <p className="rule-description">
              Réservation possible jusqu'à {rules.maxAdvance} jours à l'avance
            </p>
          </div>
        </div>

        {/* RDV max par jour */}
        <div className="rule-card">
          <div className="rule-header">
            <Users size={18} />
            <h3>RDV max par client</h3>
          </div>
          <div className="rule-content">
            <div className="number-input">
              <button
                className="number-btn"
                onClick={() =>
                  handleChange("maxPerDay", Math.max(1, rules.maxPerDay - 1))
                }
              >
                -
              </button>
              <span className="number-value">{rules.maxPerDay}</span>
              <button
                className="number-btn"
                onClick={() =>
                  handleChange("maxPerDay", Math.min(10, rules.maxPerDay + 1))
                }
              >
                +
              </button>
            </div>
            <p className="rule-description">
              Maximum {rules.maxPerDay} RDV par jour pour un même client
            </p>
          </div>
        </div>

        {/* Annulation */}
        <div className="rule-card">
          <div className="rule-header">
            <AlertCircle size={18} />
            <h3>Délai d'annulation</h3>
          </div>
          <div className="rule-content">
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="48"
                value={rules.cancellationDelay}
                onChange={(e) =>
                  handleChange("cancellationDelay", parseInt(e.target.value))
                }
                className="rule-slider"
              />
              <div className="value-display">
                <span className="value">{rules.cancellationDelay}</span>
                <span className="unit">heures</span>
              </div>
            </div>
            <p className="rule-description">
              Annulation possible jusqu'à {rules.cancellationDelay}h avant le
              RDV
            </p>
          </div>
        </div>

        {/* Options supplémentaires */}
        <div className="rule-card full-width">
          <div className="rule-header">
            <h3>Options avancées</h3>
          </div>
          <div className="options-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rules.allowWeekends}
                onChange={(e) =>
                  handleChange("allowWeekends", e.target.checked)
                }
              />
              <span>Autoriser les réservations le week-end</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rules.autoConfirm}
                onChange={(e) => handleChange("autoConfirm", e.target.checked)}
              />
              <span>Confirmation automatique des rendez-vous</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesSettings;
