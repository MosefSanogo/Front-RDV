import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Building,
  Download,
  Upload,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// Composants
import ServicesTable from "../components/ServicesTable";

import ServiceStats from "../components/ServiceStats";
import ServiceModal from "../components/ServiceModal";

import "./service.css";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import type {
  Service_Info,
  SubService,
  SubService_Info,
} from "../../../config/Types";
import Loader from "../../../components/ui/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../../components/ui/DeleteConfirmationModal";
import AppointmentsPageSkeleton from "../../appointement/skeleton/AppointementSkeleton";
import { useSecureInput } from "../../../utils/Sanitize";

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<SubService[]>([]);
  const [subServiceInfo, setSubServiceInfo] = useState<SubService_Info[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [serviceInfo] = useState<Service_Info>({
    id: "1",
    nom: "Centre Médical Principal",
    description:
      "Le Centre Médical Principal offre une gamme complète de services de santé, y compris des consultations spécialisées, des soins d'urgence, et des programmes de prévention. Notre équipe médicale expérimentée est dédiée à fournir des soins de qualité dans un environnement accueillant.",
    ville: "Bamako",
    adresse: "123 Avenue de la Santé, Bamako",
    category: "Santé",
    status: "active",
  });
  const serviceId = 1;
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/service/getSousServiceWithParams/${serviceId}`,
      )
      .then((response) => {
        setServices(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching active services count:", error);
        setIsLoading(false);
      });
  }, [serviceId]);

  const [selectedService, setSelectedService] = useState<SubService | null>(
    null,
  );
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const searchTerm = useSecureInput("", "text", { maxLength: 100 });
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteId,setDeleteId] = useState<string>("");
  // Catégories disponibles
  const categories = [
    { id: "all", name: "Toutes les catégories" },
    { id: "sante", name: "Santé" },
    { id: "laboratoire", name: "Laboratoire" },
    { id: "imagerie", name: "Imagerie Médicale" },
    { id: "sante-publique", name: "Santé Publique" },
    { id: "urgence", name: "Urgences" },
  ];

  const handleAddService = () => {
    setSelectedService(null);
    setShowServiceModal(true);
  };

  const handleEditService = (service: SubService) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const handleDeleteService = (id: string) => {
    setShowDeleteModal(true);
    setDeleteId(id);
  };

  const handleDelete = ()=>{
    axios.delete(`${import.meta.env.VITE_API_URL}/service/deleteSousService/${deleteId}`)
    .then(response=>{
      toast.success(response.data.message);
      setServices((prev)=>prev.filter((s)=>s.id !== deleteId))
      setShowDeleteModal(false)
    })
    .catch(error=>{
      toast.error('Une erreur est survenue')
      console.log(error)
      setShowDeleteModal(false)
    })
  }

  const handleToggleStatus = (id: string) => {
    setServices((prev) =>
      prev.map((service) => {
        if (service.id === id) {
          return {
            ...service,
            status:
              service.status === "active"
                ? "inactive"
                : ("active" as "active" | "inactive"),
          };
        }
        return service;
      }),
    );
    let actif = 0;
    for (const i of services) {
      if (i.id === id) {
        actif = i.status === "active" ? 0 : 1;
      }
    }
    axios
      .post(`${import.meta.env.VITE_API_URL}/service/updateSousServiceActif`, {
        actif: actif,
        id: Number(id),
      })
      .then(() => {
        if(actif === 0)
          toast.success("Sous service a été desactivé avec succès")
        else
          toast.success("Sous service a été activé avec succès")
      })
      .catch((error) => {
        console.error("Error fetching active services count:", error);
      });
  };

  const handleSaveService = (serviceData: SubService_Info[]) => {
    setLoading(true);
    if (selectedService) {
      // Mise à jour
      setSubServiceInfo((prev) =>
        prev.map((s) =>
          s.id === selectedService.id ? { ...s, ...serviceData } : s,
        ),
      );
      setLoading(false);
    } else {
      // Création

      axios.post(`${import.meta.env.VITE_API_URL}/service/addSousService`,
        {
          data: serviceData.map(item=>({nom: item.nom})),
          serviceId: 1
        }
      ).then(response=>{
        toast.success(response.data.message)
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }).catch(error=>{
        console.log(error)
        toast.error(error?.message)
        setLoading(false);
      })
    }
    setShowServiceModal(false);
    console.log(serviceData.map(item=>item.nom))
  };

  // Filtrage
  const filteredServices = services.filter((service) => {
    if (categoryFilter !== "all" && service.category !== categoryFilter)
      return false;
    if (statusFilter !== "all" && service.status !== statusFilter) return false;
    if (
      searchTerm.value &&
      !service.name.toLowerCase().includes(searchTerm.value.toString().toLowerCase())
    )
      return false;
    return true;
  });

  // Statistiques globales
  const totalServices = services.length;
  const activeServices = services.filter((s) => s.status === "active").length;
  const totalAppointmentsToday = services.reduce(
    (sum, s) => sum + s.appointmentsToday,
    0,
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredServices.slice(
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

  if(isLoading){
    return <AppointmentsPageSkeleton />
  }
  return (
    <div className="services-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <Building size={24} />
            Services
          </h1>
          <p className="page-subtitle">
            Gérez les services, sous-services et horaires
          </p>
        </div>

        <div className="header-actions">
          <button className="btn secondary">
            <Download size={18} />
            Exporter
          </button>
          <button className="btn secondary">
            <Upload size={18} />
            Importer
          </button>
          <button className="btn primary" onClick={handleAddService}>
            <Plus size={18} />
            Ajouter Sous service
          </button>
        </div>
      </div>

      {/* Statistiques globales */}
      <ServiceStats
        totalServices={totalServices}
        activeServices={activeServices}
        totalAppointments={totalAppointmentsToday}
      />

      {/* Filtres */}
      <div className="filters-section">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Rechercher un service..."
            value={searchTerm.value}
            onChange={searchTerm.handleChange}
          />
        </div>

        <div className="filter-group">
          <div className="filter-select">
            <Filter size={16} />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
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
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table principale */}
      <div className="main-content">
        <ServicesTable
          subService={currentItems}
          onEdit={handleEditService}
          onDelete={handleDeleteService}
          onToggleStatus={handleToggleStatus}
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

      {/* Modal service */}
      {showServiceModal && (
        <ServiceModal
          onClose={() => setShowServiceModal(false)}
          onSave={handleSaveService}
          serviceInfo={serviceInfo}
        />
      )}
      {loading && <Loader />}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Supprimer ce service ?"
      />
    </div>
  );
};

export default ServicesPage;
