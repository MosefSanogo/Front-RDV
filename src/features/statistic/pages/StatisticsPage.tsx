import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Download,
  CalendarRange,
  Users,
  UserX,
  Activity,
  Star,
  AlertCircle,
} from "lucide-react";
import PeriodSelector from "../components/PeriodeSelector";
import ServiceFilter from "../components/ServiceFilter";
import StatsKPICards from "../components/StatsKPICards";
import ServiceDetailsTable from "../components/ServiceDetailsTable";
import "../styles/statistics.css";
import "../styles/statisticsPage.css";
import type { Chart } from "../../../components/ui/DoubleChart";
import DoubleBarChart from "../../../components/ui/DoubleChart";
import type { CicularChar } from "../../../components/ui/CircularChar";
import CircularChart from "../../../components/ui/CircularChar";
import type { DispersionChar } from "../../../components/ui/LineChart";
import DispersionChart from "../../../components/ui/LineChart";
import axios from "axios";
import type { HourlyData, KPI, MonthlyTrend, Period, ServiceStat, Static } from "../types/StatisticType";
import StatisticsPageSkeletonSimple from "../skeleton/StatisticSkeleton";
import { AuthContext } from "../../../contexts/AuthContext";


const StatisticsPage: React.FC = () => {
  const { user } = React.useContext(AuthContext);
  const serviceId = user ? Number(user.id) : null;
  const [selectedPeriod, setSelectedPeriod] = useState<Period["id"]>("day");
  const [selectedService, setSelectedService] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [staticData, setStaticData] = useState<Static[]>([]);
  const [hourData, setHourData] = useState<HourlyData[]>([]);
  const [serviceData, setServiceData] = useState<CicularChar[]>([]);
  const [monthData, setMonthData] = useState<MonthlyTrend[]>([]);
  const [isloading, setIsLoading] = useState(true);
  // OPTIMISATION 1: Ajouter les dépendances manquantes dans useEffect
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/reservation/findStatisticByService/${serviceId}`,
      )
      .then((response) => {
        setStaticData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching today's appointments:", error);
        setIsLoading(false);
      });
  }, [serviceId]); // ✅ AJOUT: dépendance serviceId

  // OPTIMISATION 2: Fonction de construction d'URL centralisée
  const buildUrl = useCallback((endpoint: string, date: Date): string => {
    return `${import.meta.env.VITE_API_URL}/reservation/${endpoint}/${serviceId}/${date.toISOString().split("T")[0]}`;
  }, [serviceId]);

  // OPTIMISATION 3: useEffect combiné pour réduire le code dupliqué
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Construire les endpoints selon la période
      const endpoints = {
        hour: selectedPeriod === "day" || selectedPeriod === "week" 
          ? `find${selectedPeriod === "day" ? "Hourly" : "Weekly"}DataByServiceIdAndDate`
          : null,
        service: selectedPeriod === "day" 
          ? "findDayServiceDistributionByServiceIdAndDate"
          : selectedPeriod === "week"
          ? "findWeeklyServiceDistributionByServiceIdAndDate"
          : selectedPeriod === "month"
          ? "findMonthlyServiceDistributionByServiceIdAndDate"
          : "findYearlyServiceDistributionByServiceIdAndDate",
        month: selectedPeriod === "month" || selectedPeriod === "year"
          ? `find${selectedPeriod === "month" ? "Monthly" : "Yearly"}ByServiceIdAndDate`
          : null
      };

      try {
        // OPTIMISATION 4: Requêtes parallèles avec Promise.all
        const promises = [];
        
        if (endpoints.hour) {
          promises.push(
            axios.get(buildUrl(endpoints.hour, selectedDate))
              .then(res => ({ type: 'hour', data: res.data }))
          );
        }
        
        promises.push(
          axios.get(buildUrl(endpoints.service, selectedDate))
            .then(res => ({ type: 'service', data: res.data }))
        );
        
        if (endpoints.month) {
          promises.push(
            axios.get(buildUrl(endpoints.month, selectedDate))
              .then(res => ({ type: 'month', data: res.data }))
          );
        }

        const results = await Promise.all(promises);
        
        // Mettre à jour les states
        results.forEach(result => {
          if (result.type === 'hour') setHourData(result.data);
          if (result.type === 'service') setServiceData(result.data);
          if (result.type === 'month') setMonthData(result.data);
        });
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod, serviceId, selectedDate, buildUrl]); // ✅ AJOUT: dépendances

  // OPTIMISATION 5: useMemo pour les données calculées
  const kpiData = useMemo((): KPI[] => {
    if (staticData.length === 0) return [];
    
    const icons = [Calendar, CalendarRange, Users, UserX, Activity, Star];
    const colors = ["var(--card-1)", "var(--card-2)", "var(--card-3)", "var(--error)", "var(--success)", "var(--warning)"];
    const trends = [
      { value: 12, direction: "up" as const },
      { value: 8, direction: "up" as const },
      { value: 5, direction: "up" as const },
      { value: 2, direction: "down" as const },
      { value: 5, direction: "up" as const },
      undefined
    ];

    return staticData.slice(0, 6).map((item, index) => ({
      id: item.id,
      label: item.label,
      value: item.value,
      icon: icons[index],
      color: colors[index],
      ...(trends[index] && { trend: trends[index] })
    }));
  }, [staticData]);

  // OPTIMISATION 6: useMemo pour les données du graphique
  const chartData = useMemo((): Chart => ({
    capacity: hourData.map(item => item.capacity),
    appointment: hourData.map(item => item.appointments),
    labels: hourData.map(item => item.hour),
  }), [hourData]);

  // OPTIMISATION 7: useMemo pour les données d'évolution
  const monthlyTrendFormated = useMemo((): DispersionChar => ({
    appointment: monthData.map(item => item.appointments),
    labels: monthData.map(item => item.month),
  }), [monthData]);

  // OPTIMISATION 8: useCallback pour les handlers
  const handleExport = useCallback(() => {
    console.log("Export des statistiques");
    // Implémenter la logique d'export ici
  }, []);

  const handlePeriodChange = useCallback((periodId: Period["id"]) => {
    setSelectedPeriod(periodId);
  }, []);

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
  }, []);

  // OPTIMISATION 9: Chargement avec skeleton
  if (isloading) {
    return (
      <StatisticsPageSkeletonSimple/>
    );
  }

  // Données d'exemple (conservées identiques)
  const serviceStats: ServiceStat[] = [
    {
      id: "1",
      name: "Consultation",
      subServices: [
        { id: "1-1", name: "Générale", appointments: 120, absences: 8, fillRate: 85, peakHour: "09:00" },
        { id: "1-2", name: "Spécialiste", appointments: 85, absences: 6, fillRate: 78, peakHour: "14:00" },
        { id: "1-3", name: "Pédiatrie", appointments: 65, absences: 4, fillRate: 92, peakHour: "10:00" },
      ],
      totalAppointments: 270,
      todayAppointments: 12,
      absences: 18,
      capacity: 35,
      fillRate: 85,
    },
    {
      id: "2",
      name: "Laboratoire",
      subServices: [
        { id: "2-1", name: "Prise de sang", appointments: 95, absences: 7, fillRate: 88, peakHour: "08:00" },
        { id: "2-2", name: "Analyses", appointments: 110, absences: 9, fillRate: 82, peakHour: "09:00" },
      ],
      totalAppointments: 205,
      todayAppointments: 8,
      absences: 16,
      capacity: 28,
      fillRate: 82,
    },
    {
      id: "3",
      name: "Radiologie",
      subServices: [
        { id: "3-1", name: "Scanner", appointments: 45, absences: 3, fillRate: 90, peakHour: "11:00" },
        { id: "3-2", name: "IRM", appointments: 35, absences: 2, fillRate: 88, peakHour: "15:00" },
        { id: "3-3", name: "Radiographie", appointments: 55, absences: 5, fillRate: 85, peakHour: "09:00" },
      ],
      totalAppointments: 135,
      todayAppointments: 4,
      absences: 10,
      capacity: 20,
      fillRate: 87,
    },
  ];

  return (
    <div className="statistics-page">
      {/* Header */}
      <header className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <BarChart3 size={28} />
            Statistiques
          </h1>
          <p className="page-subtitle">
            Analysez la performance de vos services
          </p>
        </div>

        <div className="header-actions">
          <button className="btn secondary" onClick={handleExport}>
            <Download size={18} />
            Exporter
          </button>
        </div>
      </header>

      {/* Filtres */}
      <div className="filters-bar">
        <PeriodSelector
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
        />

        <ServiceFilter
          selectedService={selectedService}
          onServiceChange={setSelectedService}
        />

        <div className="date-range">
          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
            className="date-input"
          />
        </div>
      </div>

      {/* KPIs Cards */}
      <StatsKPICards kpis={kpiData} />

      {/* Graphiques */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>
              <Activity size={18} />
              Répartition horaire
            </h3>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-dot appointments" />
                <span>RDV pris</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot capacity" />
                <span>Capacité</span>
              </div>
            </div>
          </div>
          <DoubleBarChart data={chartData} />
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>
              <PieChart size={18} />
              Répartition par sous service
            </h3>
          </div>
          <CircularChart data={serviceData} />
        </div>

        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>
              <TrendingUp size={18} />
              Évolution mensuelle
            </h3>
          </div>
          <DispersionChart data={monthlyTrendFormated} />
        </div>
      </div>

      {/* Alertes */}
      <div className="alerts-section">
        <div className="alert-card warning">
          <AlertCircle size={18} />
          <div className="alert-content">
            <strong>Pic d'affluence détecté</strong>
            <span>10h00 - 12h00 : 45% des RDV de la journée</span>
          </div>
        </div>

        <div className="alert-card success">
          <Activity size={18} />
          <div className="alert-content">
            <strong>Créneaux sous-utilisés</strong>
            <span>12h00 - 14h00 : 30% de capacité seulement</span>
          </div>
        </div>
      </div>

      {/* Tableau détaillé */}
      <div className="details-section">
        <div className="section-header">
          <h2>
            <Calendar size={20} />
            Détail par service
          </h2>
          <div className="section-actions">
            <select className="detail-filter">
              <option value="all">Tous les services</option>
              <option value="consultation">Consultation</option>
              <option value="laboratoire">Laboratoire</option>
              <option value="radiologie">Radiologie</option>
            </select>
          </div>
        </div>

        <ServiceDetailsTable services={serviceStats} />
      </div>
    </div>
  );
};

export default StatisticsPage;