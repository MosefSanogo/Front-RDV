import { useContext, useEffect, useState } from "react";
import DatePickerValue from "../../../components/ui/DatePicker";
import AppointmentsToday from "../../appointement/components/AppointmentsToday";
import SimpleCharts, { type BarChartData } from "../components/BarChar";
import TimeSlotsCard from "../components/SlotAvailable";
import StatsCard from "../components/StatsCard";
import "./dashboard.css";
import axios from "axios";
import type { RendezVous } from "../../../config/Types";
import DashboardSkeleton from "../skeleton/DashboardSkeleton";
import { AuthContext } from "../../../contexts/AuthContext";
interface Appointment {
  id: number;
  heure: string;
  client: string;
  service: string;
  statut: string;
  isActive?: boolean;
}
function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(localStorage.getItem("dashDate") || new Date()),
  );
  const [appointments, setAppointments] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [dataTimeSlots, setDataTimeSlots] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
   const { user } = useContext(AuthContext);
  const serviceId = user ? Number(user.id) : null; // Remplacez par l'ID de votre service
  const sousService = 0;
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/time-slot/getTimeSlots/${serviceId}/${sousService}/${selectedDate.toISOString().split("T")[0]}`,
      )
      .then((response) => {
        setDataTimeSlots(response.data.count.total_disponibles);
        setTimeSlots(response.data.slots);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching today's appointments:", error);
        setIsLoading(false);
      });
  }, [selectedDate, serviceId, sousService]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/reservation/findByDateAndService/${selectedDate.toISOString().split("T")[0]}/${serviceId}`,
      )
      .then((response) => {
        setAppointments(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching today's appointments:", error);
        setIsLoading(false);
      });
  }, [selectedDate, serviceId]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/reservation/findByDateAndServiceGroupByTime/${selectedDate.toISOString().split("T")[0]}/${serviceId}`,
      )
      .then((response) => {
        setBarChartData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bar chart data:", error);
        setIsLoading(false);
      });
  }, [selectedDate, serviceId]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/service/getCountSousServiceActif/${serviceId}`,
      )
      .then((response) => {
        setCount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching active services count:", error);
        setIsLoading(false);
      });
  }, [serviceId]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/citoyen/getCountClientForService/${serviceId}`,
      )
      .then((response) => {
        setClientCount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching client count:", error);
        setIsLoading(false);
      });
  }, [serviceId]);

  const reservations: Appointment[] = appointments.map((rdv: RendezVous) => ({
    id: rdv.id,
    heure: rdv.heure,
    client: rdv.nom + " " + rdv.prenom,
    service: rdv.sous_service_nom,
    statut: rdv.statut,
  }));
  const barChartDataFormatted: BarChartData = {
    time: barChartData.map(
      (item: { time: string; total_reservations: number }) => item.time.replace(":","h"),
    ),
    total_reservations: barChartData.map(
      (item: { time: string; total_reservations: number }) =>
        item.total_reservations,
    ),
  };

  if(isLoading){
    return <DashboardSkeleton />
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <DatePickerValue value={selectedDate} onDateChange={setSelectedDate} name={"dashDate"}/>
      </div>
      <StatsCard
        todayAppointments={reservations.length}
        totalClients={clientCount}
        activeServices={count}
        availableSlots={dataTimeSlots === null ? 0 : dataTimeSlots}
      />
      <div className="dashboard-appointments-today">
          <AppointmentsToday appointments={reservations} />
        <div className="chart-container">
          <SimpleCharts data={barChartDataFormatted} />
        </div>
      </div>
      <div className="dashboard-slots">
        <TimeSlotsCard timeSlots={timeSlots} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Dashboard;
