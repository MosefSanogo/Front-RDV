import { useEffect, useState } from "react";
import SlotsCard from "../components/SlotsAvalaible";
import "./creneaux.css";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
function Creneaux() {

  const [selectedDate, setSelectedDate] = useState<Date>(new Date(localStorage.getItem("creneauDate") || new Date()));
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const serviceId = 1; // Remplacez par l'ID de votre service
    const sousService = 0;
    useEffect(() => {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/time-slot/getTimeSlots/${serviceId}/${sousService}/${selectedDate.toISOString().split("T")[0]}`,
        )
        .then((response) => {
          setTimeSlots(response.data.slots);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching today's appointments:", error);
          setIsLoading(false);
        });
    }, [selectedDate, serviceId, sousService]);


  const totalPages = Math.ceil(timeSlots.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = timeSlots.slice(startIndex, startIndex + itemsPerPage);
  const handlePageNext = (page: number) => {
    if (page < totalPages) {
      setCurrentPage(page + 1);
    }
  };
  const handlePagePrev = (page: number) => {
    if (page > 1) {
      setCurrentPage(page - 1);
    }
  };
  return (
    <div className="creneaux-page">
      <h1>
        <Calendar size={20} className="header-icon" /> Créneaux disponibles
      </h1>
      <SlotsCard
        value={selectedDate}
        onDateChange={setSelectedDate}
        timeSlots={currentItems}
        isLoading={isLoading}
        localName="creneauDate"
      />
      <div className="pagination">
        <div className="pagination-select">
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5 par page</option>
            <option value={10}>10 par page</option>
            <option value={20}>20 par page</option>
          </select>
        </div>
        <div className="pagination-info">
          <div>
            <Tooltip title="Page précédente">
              <IconButton
                onClick={() => handlePagePrev(currentPage)}
                disabled={currentPage === 1}
                className="icon-btn"
              >
                <ChevronLeft
                  size={24}
                  color={
                    currentPage === 1
                      ? "var(--text-disabled)"
                      : "var(--text-primary)"
                  }
                />
              </IconButton>
            </Tooltip>
          </div>
          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-page ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <div>
            <Tooltip title="Page suivante">
              <IconButton
                onClick={() => handlePageNext(currentPage)}
                disabled={currentPage === totalPages}
                className="icon-btn"
              >
                <ChevronRight
                  size={24}
                  color={
                    currentPage === totalPages
                      ? "var(--text-disabled)"
                      : "var(--text-primary)"
                  }
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Creneaux;
