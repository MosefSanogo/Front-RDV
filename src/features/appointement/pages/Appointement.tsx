import React, { useEffect, useState } from "react";
import { Calendar, Search, Filter, Download, Printer, ChevronLeft, ChevronRight } from "lucide-react";

// Styles
import "./appointement.css";
import DateHeader from "../components/DateHeader";
import QuickStats from "../components/QuickStats";
import AppointmentsTable, {
  type Appointment,
} from "../components/AppointmentsTable";
import { handlePrint } from "../../../utils/Print";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

// Types
interface AppointmentData {
  id: string;
  heure: string;
  nom: string;
  prenom: string;
  tel: string;
  sous_service_nom: string;
  statut: "served" | "absent" | "pending";
  date?: string;
}

const AppointmentsPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(localStorage.getItem("appointmentDate") || new Date()));
  const [selectedService, setSelectedService] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const serviceId = 1;
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/reservation/findByDateAndService/${selectedDate.toISOString().split("T")[0]}/${serviceId}`,
      )
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching today's appointments:", error);
      });
  }, [selectedDate, serviceId]);
  const appointmentFormated: Appointment[] = appointments.map((m) => ({
    id: m.id,
    time: m.heure.slice(0, 5),
    fullName: m.prenom + " " + m.nom,
    phone: m.tel,
    service: m.sous_service_nom,
    status: m.statut,
  }));

  const services = [
    { id: "all", name: "Tous les services" },
    { id: "consultation", name: "Consultation" },
    { id: "radiologie", name: "Radiologie" },
    { id: "laboratoire", name: "Laboratoire" },
    { id: "urgence", name: "Urgences" },
  ];

  const handleMarkServed = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "served" } : apt)),
    );
  };

  const handleMarkAbsent = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "absent" } : apt)),
    );
  };

  const filteredAppointments = appointmentFormated.filter((apt) => {
    if (
      selectedService !== "all" &&
      apt.service.toLowerCase() !== selectedService
    )
      return false;
    if (statusFilter !== "all" && apt.status !== statusFilter) return false;
    if (
      searchTerm &&
      !apt.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  // Calcul des statistiques
  const totalAppointments = appointments.length;
  const servedCount = appointments.filter((a) => a.statut === "served").length;
  const absentCount = appointments.filter((a) => a.statut === "absent").length;
  const pendingCount = appointments.filter(
    (a) => a.statut === "pending",
  ).length;

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredAppointments.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
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
    <div className="appointments-page print-area">
      {/* Header */}
      <header className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <Calendar size={24} />
            Rendez-vous
          </h1>
          <DateHeader date={selectedDate} onDateChange={setSelectedDate} />
        </div>
        <div className="header-actions">
          <button className="btn secondary">
            <Download size={18} />
            Exporter
          </button>
          <button className="btn secondary" onClick={handlePrint}>
            <Printer size={18} />
            Imprimer
          </button>
        </div>
      </header>

      {/* Quick Stats */}
      <QuickStats
        total={totalAppointments}
        served={servedCount}
        absent={absentCount}
        pending={pendingCount}
      />

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div className="filter-select">
            <Filter size={16} />
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="served">Servi</option>
              <option value="pending">À venir</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="main-content">
        <AppointmentsTable
          appointments={currentItems}
          onMarkServed={handleMarkServed}
          onMarkAbsent={handleMarkAbsent}
          onCall={(phone) =>
            window.open(`tel:${phone.replace(/\s/g, "")}`, "_blank")
          }
        />
      </div>

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
};

export default AppointmentsPage;
