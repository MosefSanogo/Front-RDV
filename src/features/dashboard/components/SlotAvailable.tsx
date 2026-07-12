import React, { useState } from "react";
import {
  Clock,
  Users,
  TrendingUp,
  Calendar,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import "./slotAvailable.css";

interface TimeSlot {
  id?: number;
  time: string; // Format: "08:00", "09:00", etc.
  capacity: number;
  available: number;
  percentage: number;
  isPeakHour: boolean;
  isCompleted: boolean;
}

interface TimeSlotsCardProps {
  date?: Date;
  timeSlots?: TimeSlot[];
  isLoading?: boolean;
}

const TimeSlotsCard: React.FC<TimeSlotsCardProps> = ({
  timeSlots = [],
  isLoading = false,
}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [filter, setFilter] = useState<
    "all" | "available" | "peak" | "completed"
  >("all");

  const filteredSlots = timeSlots.filter((slot) => {
    switch (filter) {
      case "available":
        return slot.available > 0;
      case "peak":
        return slot.isPeakHour;
      case "completed":
        return slot.available === 0;
      default:
        return true;
    }
  });

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return `${hours}h${minutes}`;
  };

  const getTimeStatus = (slot: TimeSlot) => {
    if (slot.available === 0) return "complet";
    if (slot.percentage <= 20) return "presque-complet";
    if (slot.percentage >= 80) return "disponible";
    return "normal";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      complet: "var(--error)",
      "presque-complet": "var(--warning)",
      disponible: "var(--success)",
      normal: "var(--info)",
    };
    return colors[status as keyof typeof colors] || "var(--info)";
  };

  const getProgressGradient = (percentage: number) => {
    if (percentage <= 20)
      return "linear-gradient(90deg, var(--error) 0%, #f97316 100%)";
    if (percentage <= 50)
      return "linear-gradient(90deg, var(--warning) 0%, #eab308 100%)";
    if (percentage <= 80)
      return "linear-gradient(90deg, var(--info) 0%, #0ea5e9 100%)";
    return "linear-gradient(90deg, var(--success) 0%, #22c55e 100%)";
  };

  const totalAvailable = timeSlots.reduce(
    (sum, slot) => sum + Number(slot.available),
    0,
  );

  const totalCapacity = timeSlots.reduce(
    (sum, slot) => sum + Number(slot.capacity),
    0,
  );
  const totalPercentage = totalCapacity > 0 
  ? Math.round((totalAvailable / totalCapacity) * 100) 
  : 0;

  const PeakHourIndicator = () => (
    <div className="peak-indicator">
      <Zap size={12} />
      <span>Heure de pointe</span>
    </div>
  );

  const RecommendedBadge = () => (
    <div className="recommended-badge">
      <CheckCircle size={12} />
      <span>Complet</span>
    </div>
  );

  return (
    <div className="time-slots-card">
      {/* Header */}
      <div className="time-slots-header">
        <div className="header-left">
          <div className="title-section">
            <Calendar size={20} className="header-icon" />
            <h2>Créneaux disponibles aujourd'hui</h2>
          </div>
          <div className="summary-stats">
            <div className="stat-item">
              <Users size={16} />
              <span className="stat-value">
                {totalAvailable}/{totalCapacity}
              </span>
              <span className="stat-label">Places</span>
            </div>
            <div className="stat-item">
              <TrendingUp size={16} />
              <span className="stat-value">{totalPercentage}%</span>
              <span className="stat-label">Taux</span>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Tous
            </button>
            <button
              className={`filter-btn ${filter === "available" ? "active" : ""}`}
              onClick={() => setFilter("available")}
            >
              Disponibles
            </button>
            <button
              className={`filter-btn ${filter === "peak" ? "active" : ""}`}
              onClick={() => setFilter("peak")}
            >
              <Zap size={14} />
              Pointe
            </button>
            <button
              className={`filter-btn ${filter === "completed" ? "active" : ""}`}
              onClick={() => setFilter("completed")}
            >
              <CheckCircle size={14} />
              Complet
            </button>
          </div>
        </div>
      </div>

      {/* Time Slots Grid - Maintenant regroupé par heures */}
      <div className="time-slots-grid">
        {isLoading ? (
          <div className="loading-state">
            <Loader2 size={32} className="spinner" />
            <p>Chargement des créneaux...</p>
          </div>
        ) : filteredSlots.length === 0 ? (
          <div className="empty-state">
            <AlertCircle size={48} />
            <h3>Aucun créneau disponible</h3>
            <p>Aucun créneau ne correspond aux filtres sélectionnés</p>
          </div>
        ) : (
          <div className="hours-grid">
            {filteredSlots.map((slot, index) => {
              const status = getTimeStatus(slot);
              const statusColor = getStatusColor(status);

              return (
                <div
                  key={index}
                  className={`hour-slot ${selectedTime === slot.time ? "selected" : ""} ${slot.available === 0 ? "full" : ""}`}
                  onClick={() => {
                    setSelectedTime(slot.time);
                  }}
                >
                  {/* Heure en grand */}
                  <div className="hour-display">
                    <Clock size={20} />
                    <span className="hour-text">{formatTime(slot.time)}</span>
                    <div className="hour-badges">
                      {slot.isPeakHour && <PeakHourIndicator />}
                      {slot.isCompleted && <RecommendedBadge />}
                    </div>
                  </div>

                  {/* Capacité et disponibilité */}
                  <div className="hour-info">
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Capacité</span>
                        <span className="info-value capacity">
                          {slot.capacity}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Disponible</span>
                        <span
                          className="info-value available"
                          style={{ color: statusColor }}
                        >
                          {slot.available}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Pourcentage</span>
                        <span
                          className="info-value percentage"
                          style={{ color: statusColor }}
                        >
                          {slot.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Barre de progression */}
                    <div className="hour-progress">
                      <div className="progress-visual">
                        <div
                          className="progress-fill"
                          style={{
                            background: getProgressGradient(slot.percentage),
                            width: `${slot.percentage}%`,
                          }}
                        />
                        <div className="progress-dots">
                          {[...Array(slot.capacity)].map((_, i) => (
                            <div
                              key={i}
                              className={`progress-dot ${i < slot.available ? "available" : "booked"}`}
                              style={{
                                left: `${(i / (slot.capacity - 1)) * 100}%`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="progress-text">
                        <span className="status-text">
                          {slot.available === 0
                            ? "Complet"
                            : slot.available === slot.capacity
                              ? "Toutes places libres"
                              : `${slot.available} place${slot.available > 1 ? "s" : ""} libre${slot.available > 1 ? "s" : ""}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="time-slots-footer">
        <div className="footer-stats">
          <div className="footer-stat">
            <div className="footer-stat-label">Heures actives</div>
            <div className="footer-stat-value">
              {filteredSlots.filter((s) => s.available > 0).length}
            </div>
          </div>
          <div className="footer-stat">
            <div className="footer-stat-label">Taux moyen</div>
            <div className="footer-stat-value">
              {filteredSlots.length > 0
                ? Math.round(
                    filteredSlots.reduce((sum, s) => sum + s.percentage, 0) /
                      filteredSlots.length,
                  )
                : 0}
              %
            </div>
          </div>
          <div className="footer-stat">
            <div className="footer-stat-label">Meilleure heure</div>
            <div className="footer-stat-value recommended-time">
              {filteredSlots.filter((s) => s.isCompleted && s.available > 0)[0]
                ?.time
                ? formatTime(
                    filteredSlots.filter(
                      (s) => s.isCompleted && s.available > 0,
                    )[0].time,
                  )
                : "--:--"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotsCard;
