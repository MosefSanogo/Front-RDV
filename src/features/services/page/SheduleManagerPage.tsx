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
import { toast } from "react-toastify";

function SheduleManagerPage() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des horaires :", error);
        setIsLoading(false);
      });
  }, [sousServiceId]);

  const handleUpdateSchedule = (id: string, updates: Partial<Schedule>) => {
    setIsEditing(true);
    const updatedSchedule = schedule.map((s) =>
      s.id === id ? { ...s, ...updates } : s,
    );
    setSchedule(updatedSchedule);
    const updatedEntry = updatedSchedule.find((s) => s.id === id);
    if (updatedEntry) {
      if (updatedEntry?.startTime >= updatedEntry?.endTime) {
        toast.error("L'heure de début doit être inférieure à l'heure de fin");
        setIsEditing(false);
        return;
      }
    }
    try {
      axios.patch(
        `${import.meta.env.VITE_API_URL}/horaire-travail/update/${id}`,
        updates,
      );
      setSchedule((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
      );
      toast.success("Colonne a été modifiée avec succès");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    window.history.back();
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
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

export default SheduleManagerPage;
