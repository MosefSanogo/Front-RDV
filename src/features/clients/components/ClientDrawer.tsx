import React, { useEffect, useState } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  Calendar,
  Edit2,
  Save,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronRight,
  Book,
} from "lucide-react";
import "../styles/clientDrawer.css";
import type {
  Client,
  ClientDrawerProps,
  ClientInfo,
} from "../../../config/Types";
import axios from "axios";
interface ClientHistory  {
  date: string,
  time: string,
  service: string,
  status: 'served' | 'absent' | 'pending'
}
const ClientDrawer: React.FC<ClientDrawerProps> = ({
  client,
  onClose,
  onUpdate,
  onInfoUpdate,
  sousService,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedClient, setEditedClient] = useState<Client>(client);
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    id: client.id,
    service: sousService,
    note: "",
  });
  const[appointments, setAppointments] = useState<ClientHistory[]>([]);
  useEffect(()=>{
      axios.
      get(
        `${import.meta.env.VITE_API_URL}/reservation/findClientReservation/${client.id}`,
      ).then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching active services count:", error);
      });
  },[client.id])


  const handleSave = () => {
    onUpdate(editedClient);
    setIsEditing(false);
    onInfoUpdate({ ...clientInfo, service: sousService });
  };

  const handleCancel = () => {
    setEditedClient(client);
    setIsEditing(false);
  };

  /*const formatDate = (date: string | null) => {
    if (!date) return 'Jamais';
    return date;
  };*/

  const getMemberSince = (date: string) => {
    const created = new Date(date);
    const now = new Date();
    const diffMonths =
      (now.getFullYear() - created.getFullYear()) * 12 +
      (now.getMonth() - created.getMonth());

    if (diffMonths < 1) return "Ce mois-ci";
    if (diffMonths === 1) return "1 mois";
    return `${diffMonths} mois`;
  };

   const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "var(--success)";
      case "inactive":
        return "var(--error)";
      case "new":
        return "var(--warning)";
      default:
        return "var(--text-secondary)";
    }
  };

  const getAppointmentStatusBadge = (status: string) => {
    const config = {
      served: { label: "Servi", color: "var(--success)" },
      absent: { label: "Absent", color: "var(--error)" },
      pending: { label: "À venir", color: "var(--warning)" },
    };

    const { label, color } =
      config[status as keyof typeof config] || config.served;

    return (
      <span className="appointment-status" style={{ color }}>
        {label}
      </span>
    );
  };

  return (
    <div className="client-drawer-overlay">
      <div className="client-drawer">
        {/* Header */}
        <div className="drawer-header">
          <div className="header-left">
            <h2 className="drawer-title">
              <User size={20} />
              Fiche client
            </h2>
            <div className="client-id">ID: {client.id}</div>
          </div>
          <div className="header-actions">
            {!isEditing ? (
              <button className="header-btn" onClick={() => setIsEditing(true)}>
                <Edit2 size={16} />
                Modifier
              </button>
            ) : (
              <>
                <button className="header-btn save" onClick={handleSave}>
                  <Save size={16} />
                  Enregistrer
                </button>
                <button className="header-btn" onClick={handleCancel}>
                  <X size={16} />
                  Annuler
                </button>
              </>
            )}
            <button className="close-btn" onClick={onClose} data-testid="close-btn">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="drawer-content">
          {/* Profil */}
          <div className="profile-section">
            <div className="profile-avatar">
              {client.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="profile-info">
              {!isEditing && (
                <h3 className="profile-name">{client.fullName}</h3>
              )}
              <div className="profile-meta">
                <div
                  className="profile-status"
                  style={{
                    backgroundColor: `${getStatusColor(client.status)}15`,
                    color: getStatusColor(client.status),
                    borderColor: getStatusColor(client.status),
                  }}
                >
                  {client.status === "active" && "Client actif"}
                  {client.status === "inactive" && "Client inactif"}
                  {client.status === "new" && "Nouveau client"}
                </div>
                <span className="profile-member">
                  Membre depuis {getMemberSince(client.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="section">
            <h4 className="section-title">
              <Phone size={16} />
              Coordonnées
            </h4>
            <div className="contact-grid">
              <div className="contact-item">
                <Phone size={14} className="contact-icon" />
                <div className="contact-detail">
                  <span className="contact-label">Téléphone</span>
                  <span className="contact-value">{client.phone}</span>
                </div>
              </div>

              <div className="contact-item">
                <Mail size={14} className="contact-icon" />
                <div className="contact-detail">
                  <span className="contact-label">Email</span>

                  <span className="contact-value">
                    {client.email || "Non renseigné"}
                  </span>
                </div>
              </div>

              <div className="contact-item">
                {isEditing && (<Book size={14} className="contact-icon" />)}
                <div className="contact-detail">
                  {isEditing && (
                    <>
                      <span className="contact-label">Notes</span>
                      <input
                        type="text"
                        value={clientInfo.note || ""}
                        onChange={(e) =>
                          setClientInfo({ ...clientInfo, note: e.target.value })
                        }
                        className="edit-input"
                        placeholder="Non renseigné"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="section">
            <h4 className="section-title">
              <TrendingUp size={16} />
              Statistiques
            </h4>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-icon" style={{ color: "var(--info)" }}>
                  <Calendar size={20} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{client.totalAppointments}</div>
                  <div className="stat-label">Total RDV</div>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon" style={{ color: "var(--error)" }}>
                  <XCircle size={20} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{client.absences}</div>
                  <div className="stat-label">Absences</div>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon" style={{ color: "var(--success)" }}>
                  <CheckCircle size={20} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    {client.totalAppointments - client.absences}
                  </div>
                  <div className="stat-label">Présences</div>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon" style={{ color: "var(--card-1)" }}>
                  <Clock size={20} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    {Math.round(
                      ((client.totalAppointments - client.absences) /
                        (client.totalAppointments || 1)) *
                        100,
                    )}
                    %
                  </div>
                  <div className="stat-label">Fiabilité</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services utilisés */}
          <div className="section">
            <h4 className="section-title">Services utilisés</h4>
            <div className="services-list">
              {client.services.length > 0 ? (
                client.services.map((service, index) => (
                  <div key={index} className="service-tag">
                    {service}
                  </div>
                ))
              ) : (
                <span className="no-data">Aucun service utilisé</span>
              )}
            </div>
          </div>

          {/* Notes */}
          {client.notes && (
            <div className="section">
              <h4 className="section-title">
                <AlertCircle size={16} />
                Notes
              </h4>
              <div className="notes-content">{client.notes}</div>
            </div>
          )}

          {/* Historique des rendez-vous */}
          <div className="section">
            <h4 className="section-title">
              <Calendar size={16} />
              Historique des rendez-vous
            </h4>
            <div className="appointments-history">
              {appointments.map((apt, index) => (
                <div key={index} className="appointment-item">
                  <div className="appointment-date">
                    <div className="date-badge">
                      <span className="day">{apt.date.split("/")[0]}</span>
                      <span className="month">{apt.date.split("/")[1]}</span>
                    </div>
                  </div>
                  <div className="appointment-details">
                    <div className="appointment-main">
                      <span className="appointment-time">{apt.time.slice(0,5).replace(":","h")}</span>
                      <span className="appointment-service">{apt.service}</span>
                    </div>
                    {getAppointmentStatusBadge(apt.status)}
                  </div>
                  <ChevronRight size={16} className="appointment-arrow" />
                </div>
              ))}
            </div>

            <button className="view-all-btn">
              Voir tous les rendez-vous
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDrawer;
