import React, { useCallback, useEffect, useState } from "react";
import {
  Settings,
  Building2,
  Clock,
  Users,
  Calendar,
  CalendarX,
  Shield,
  Globe,
  CalendarOff,
} from "lucide-react";

import "../styles/settingsPage.css";
import GeneralSettings, { type GeneralSettingsData } from "../components/GeneralSettings";
import BusinessHoursSettings, {
  type DaySchedule,
} from "../components/BusinessHoursSettings";
import HolidaysSettings, { type Holiday } from "../components/HolidaysSettings";
import RulesSettings, { type Rule } from "../components/RulesSettings";
import CapacitySettings from "../components/CapacitySettings";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../components/ui/Loader";
import DeleteConfirmationModal from "../../../components/ui/DeleteConfirmationModal";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Pauses } from "../components/Pauses";
import PausesSettings from "../components/Pauses";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [rules, setRules] = useState<Rule>({} as Rule);
  const [subServices, setSubServices] = useState<{ id: string; nom: string }[]>([]);
  const [serviceInfo, setServiceInfo] = useState<GeneralSettingsData >({} as GeneralSettingsData);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string>("");
  const tabs = [
    { id: "general", label: "Général", icon: Building2 },
    { id: "hours", label: "Horaires", icon: Clock },
    { id: "capacity", label: "Capacité", icon: Users },
    { id: "holidays", label: "Jours chômés", icon: CalendarX },
    { id: "rules", label: "Règles", icon: Calendar },
    {id: "pause",label:"Pauses", icon:CalendarOff},
    /*{ id: "notifications", label: "Notifications", icon: Bell },*/
    { id: "security", label: "Sécurité", icon: Shield },
  ];
  const { user } = React.useContext(AuthContext);
  const serviceId = user ? Number(user.id) : null;
  const handleSaveHolidays = useCallback(
    (data: Holiday) => {
      setIsSaving(true);
      axios
        .post(`${import.meta.env.VITE_API_URL}/jour-ferie/register`, {
          id_service: serviceId,
          date: data.date,
          description: data.label,
          type: data.type,
        })
        .then(() => {
          setIsSaving(false);
          toast.success("Jour férié enregistré avec succès !");
        })
        .catch((error) => {
          console.error("Error saving holiday:", error);
          setIsSaving(false);
          toast.error("Erreur lors de l'enregistrement du jour férié.");
        });
    },
    [serviceId],
  );

  const handleSavePauses = useCallback(
    (data: Pauses) => {
      setIsSaving(true);
      axios
        .post(`${import.meta.env.VITE_API_URL}/pauses/register`, {
          service_id: serviceId,
          sous_service_id: Number(data.sous_service_id),
          heure_debut: data.heure_debut,
          heure_fin: data.heure_fin,
        })
        .then(() => {
          setIsSaving(false);
          toast.success("Intervalle de pause enregistré avec succès !");
        })
        .catch((error) => {
          console.error("Error saving holiday:", error);
          setIsSaving(false);
          toast.error("Erreur lors de l'enregistrement.");
        });
    },
    [serviceId],
  );

  const handleSaveRules = useCallback(
    (data: Rule) => {
      setIsSaving(true);
      console.log(data);
      axios
        .post(`${import.meta.env.VITE_API_URL}/rules/register`, {
          service_id: serviceId,
          delay_min: data.minDelay,
          delay_max: data.maxAdvance,
          client_max: data.maxPerDay,
          delay_cancel: data.cancellationDelay,
        })
        .then(() => {
          setIsSaving(false);
          toast.success("Règles enregistrées avec succès !");
        })
        .catch((error) => {
          console.error("Error saving rules:", error);
          setIsSaving(false);
          toast.error("Erreur lors de l'enregistrement des règles.");
        });
    },
    [serviceId],
  );

  const handleSaveHours = useCallback(
    (data: DaySchedule[], subServiceId: string) => {
      setIsSaving(true);
      
      const payload = data.map((d) => ({
        service_id: serviceId,
        sous_service_id: Number(subServiceId),
        jour_semaine: Number(d.id),
        heure_debut: d.openTime,
        heure_fin: d.closeTime,
        capacity_heure: d.capacity,
      }));
      console.log(payload)
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/horaire-travail/register`,
          payload,
        )
        .then(() => {
          setIsSaving(false);
          toast.success("Horaires enregistrés avec succès !");
        })
        .catch((error) => {
          console.error("Error saving hours:", error);
          setIsSaving(false);
          toast.error("Erreur lors de l'enregistrement des horaires.");
        });
    },
    [serviceId],
  );

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/jour-ferie/findByServiceId/${serviceId}`,
      )
      .then((response) => {
        setHolidays(response.data);
      })
      .catch((error) => {
        console.error("Error fetching holidays:", error);
      });
  }, [serviceId]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/rules/findByServiceId/${serviceId}`)
      .then((response) => {
        setRules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rules:", error);
      });
  }, [serviceId]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/service/findAllSousServices/${serviceId}`,
      )
      .then((response) => {
        setSubServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sub-services:", error);
      });
  }, [serviceId]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/service/findByServiceId/${serviceId}`,
      )
      .then((response) => {
        setServiceInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sub-services:", error);
      });
  }, [serviceId]);

  const handleDeleteService = (id: string) => {
    setShowDeleteModal(true);
    setDeletingId(id);
  };
  
 

  const handleDelete = () => {
    axios.delete(`${import.meta.env.VITE_API_URL}/jour-ferie/delete/${deletingId}`)
    .then(() => {
      setHolidays((prev) => prev.filter((h) => h.id !== deletingId));
      setShowDeleteModal(false);
      toast.success("Jour férié supprimé avec succès !");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch((error) => {
      console.error("Error deleting holiday:", error);
      setShowDeleteModal(false);
      toast.error("Erreur lors de la suppression du jour férié.");
    });
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "hours":
        return (
          <BusinessHoursSettings
            onSave={handleSaveHours}
            subServices={subServices}
          />
        );
      case "capacity":
        return <CapacitySettings />;
      case "holidays":
        return <HolidaysSettings onSave={handleSaveHolidays} data={holidays} onAction={handleDeleteService}/>;
      case "rules":
        return <RulesSettings onSave={handleSaveRules} data={rules} />;
      case "pause":
        return <PausesSettings data={[]}onSave={handleSavePauses} sousServices={subServices} onAction={handleDelete} /> 
      case "security":
        return <div className="coming-soon">Module Sécurité (à venir)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      {/* Header */}
      <header className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <Settings size={28} />
            Paramètres
          </h1>
          <p className="page-subtitle">
            Configurez le comportement global de votre système
          </p>
        </div>
      </header>

      {/* Navigation par onglets */}
      <div className="settings-container">
        <div className="settings-sidebar">
          <nav className="tabs-nav">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  {tab.id === "holidays" && (
                    <span className="tab-badge">{holidays.length}</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <div className="info-card">
              <Globe size={16} />
              <div className="info-content">
                <span className="info-label">Version</span>
                <span className="info-value">2.1.0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-content">{renderTabContent()}</div>
      </div>
      {isSaving && <Loader />}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Supprimer ce service ?"
      />
    </div>
  );
};

export default SettingsPage;
