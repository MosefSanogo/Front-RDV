import { useEffect, useState } from "react";
import "./sheduleManagerPage.css";
import ScheduleManager from "../components/SheduleManager";
import { ScheduleData, type Schedule } from "../../../config/ScheduleData";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { ArrowLeftIcon } from "lucide-react";

function SheduleManagerPage() {
  const [schedule, setSchedule] = useState<Schedule[]>(ScheduleData);
  const [loading, setLoading] = useState<boolean>(true);
  const handleUpdateSchedule = (id: string, updates: Partial<Schedule>) => {
    setSchedule((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  };
  const handleSave = () => {
    console.log("Horaires sauvegardés :", schedule);
  };
  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="shedule-manager-page">
      <div className="shedule-manager-page-header">
        <Tooltip title="Retour">
          <IconButton onClick={() => window.history.back()}>
            <ArrowLeftIcon />
          </IconButton>
        </Tooltip>
        <h1>Gestion des Horaires</h1>
      </div>
      {loading ? (
        <div className="progress-center">
          <CircularProgress size="3rem" />
        </div>
      ) : (
        <ScheduleManager
          schedule={schedule}
          onUpdate={handleUpdateSchedule}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default SheduleManagerPage;
