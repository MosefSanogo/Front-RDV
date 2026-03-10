import { useEffect, useState } from "react";
import "./sheduleManagerPage.css";
import ScheduleManager from "../components/SheduleManager";
import { type Schedule } from "../../../config/ScheduleData";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { AlertCircle, ArrowLeftIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ScheduleManagerSkeleton from "../skeleton/SheduleManagerSkeleton";

function SheduleManagerPage() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const sousServiceId = useParams<{ id: string }>().id;
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/horaire-travail/findBySousServiceId/${sousServiceId}`,
      )
      .then((response) => {
        setSchedule(response.data);
        setLoading(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des horaires :", error);
        setLoading(false);
        setIsLoading(false);
      });
  }, [sousServiceId]);

  const handleUpdateSchedule = (id: string, updates: Partial<Schedule>) => {
    setIsEditing(true);
    setSchedule((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  };
  const handleSave = () => {
    console.log("Horaires sauvegardés :", schedule);
    setIsEditing(false);
  };
  const handleBack = () => {
    window.history.back();
    if (isEditing) {
      if (
        !window.confirm(
          "Vous avez des modifications non enregistrées. Voulez-vous vraiment quitter ?",
        )
      ) {
        return;
      }
    }
  };
  if (isloading) {
    return <ScheduleManagerSkeleton />;
  }
  return (
    <div className="shedule-manager-page">
      <div className="shedule-manager-page-header">
        <Tooltip title="Retour">
          <IconButton onClick={handleBack}>
            <ArrowLeftIcon />
          </IconButton>
        </Tooltip>
        <h1>Gestion des Horaires</h1>
      </div>
      {schedule.length === 0 ? (
        <div className="empty-state">
          <AlertCircle size={48} />
          <h3>Aucun horaire disponible</h3>
          <p>Aucun horaire ne correspond aux filtres sélectionnés</p>
        </div>
      ) : (
        <ScheduleManager
          schedule={schedule}
          onUpdate={handleUpdateSchedule}
          onSave={handleSave}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

export default SheduleManagerPage;
