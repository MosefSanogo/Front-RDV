import React, { useEffect, useState } from "react";
import { Users, Plus, Download, ChevronLeft, ChevronRight } from "lucide-react";

// Styles
import "./clients.css";
import ClientStats from "../components/ClientStats";
import ClientFilters from "../components/ClientFilters";
import ClientsTable from "../components/ClientsTable";
import ClientDrawer from "../components/ClientDrawer";
import type { ClientInfo } from "../../../config/Types";
import axios from "axios";
import AppointmentsPageSkeleton from "../../appointement/skeleton/AppointementSkeleton";
import { AuthContext } from "../../../contexts/AuthContext";
import NewClientDrawer, { type newClient } from "../components/NewClientDrawer";
import { toast } from "react-toastify";
import Loader from "../../../components/ui/Loader";

// Types
interface Client {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  totalAppointments: number;
  lastAppointment: string | null;
  status: "active" | "inactive" | "new";
  absences: number;
  services: string[];
  createdAt: string;
  notes?: string;
}

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [showDrawerNew, setShowDrawerNew] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sousService, setSousService] = useState<string>("");
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [loader,setLoader] = useState<boolean>(false);
   const { user } = React.useContext(AuthContext);
  const serviceId = user ? Number(user.id) : null;
  // Données d'exemple
  const [clients, setClients] = useState<Client[]>([]);
  useEffect(()=>{
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/reservation/findAllClientReservation/${serviceId}`,
      ).then((response) => {
        setClients(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching active services count:", error);
        setIsLoading(false);
      });
  },[serviceId])
  // Services disponibles pour le filtre
  const services = [
    { id: "all", name: "Tous les services" },
    { id: "consultation", name: "Consultation" },
    { id: "laboratoire", name: "Laboratoire" },
    { id: "radiologie", name: "Radiologie" },
  ];
  const clientsFormated: Client[] = clients.map(client=>({
    ...client,
    services: client.services ? String(client.services).split(',').map(s => s.trim()) : []
  }))
  // Filtrage des clients
  const filteredClients = clientsFormated.filter((client) => {
    // Recherche textuelle
    const matchesSearch =
      searchTerm === "" ||
      client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      (client.email &&
        client.email.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filtre par service
    const matchesService =
      selectedService === "all" ||
      client.services.some((s) =>
        s.toLowerCase().includes(selectedService.toLowerCase()),
      );

    // Filtre par statut
    const matchesStatus =
      selectedStatus === "all" || client.status === selectedStatus;

    return matchesSearch && matchesService && matchesStatus;
  });

  // Tri des clients
  const sortedClients = [...filteredClients].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName);
    }
    if (sortBy === "appointments") {
      return sortOrder === "asc"
        ? a.totalAppointments - b.totalAppointments
        : b.totalAppointments - a.totalAppointments;
    }
    if (sortBy === "lastAppointment") {
      const aDate = a.lastAppointment
        ? new Date(a.lastAppointment.split("/").reverse().join("-")).getTime()
        : 0;
      const bDate = b.lastAppointment
        ? new Date(b.lastAppointment.split("/").reverse().join("-")).getTime()
        : 0;
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = sortedClients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedClients.length / itemsPerPage);

  // Statistiques
  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === "active").length;
  const newClients = clients.filter((c) => c.status === "new").length;
  const totalAppointments = clients.reduce(
    (sum, c) => sum + c.totalAppointments,
    0,
  );

  const handleViewClient = (client: Client, sousService: string) => {
    setSelectedClient(client);
    setShowDrawer(true);
    setSousService(sousService);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setShowDrawerNew(false);
    setSelectedClient(null);
  };

  const handleAddClient = () => {
    // Créer un nouveau client
    const newClient: Client = {
      id: Date.now().toString(),
      fullName: "Nouveau Client",
      phone: "00 00 00 00",
      totalAppointments: 0,
      lastAppointment: null,
      status: "new",
      absences: 0,
      services: [],
      createdAt: new Date().toISOString().split("T")[0],
    };
    setClients((prev) => [...prev, newClient]);
    setSelectedClient(newClient);
    setShowDrawerNew(true);
  };

  const handleUpdateClient = (updatedClient: Client) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === updatedClient.id ? updatedClient : client,
      ),
    );
  };

  const handleExport = () => {
    // Logique d'export CSV
    console.log("Export des clients");
  };

  const handleSave = (clientInfo: ClientInfo) => {
    console.log(clientInfo)
  }
  const handleSaveNew =(client:newClient)=>{
      setLoader(true)
      if(client.prenom.trim() === "" || client.nom.trim() === "" || client.telephone.trim() === ""){
        toast.error("Veuillez remplir tous les champs")
        setLoader(false)
        return;
      }
      axios.post(`${import.meta.env.VITE_API_URL}/citoyen/register`,client)
      .then(()=>{
        toast.success("Cleint a été ajouté avec succès")
        setShowDrawerNew(false)
        setLoader(false)
      }).catch((err)=>{
        console.log(err)
        toast.error("Une erreur s'est produite pendant l'enregistrement")
        setShowDrawerNew(false)
        setLoader(false)
      })
      
  }
  if(isloading){
    return <AppointmentsPageSkeleton/>
  }
  return (
    <div className="clients-page">
      {/* Header */}
      <header className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <Users size={24} />
            Clients
          </h1>
        </div>

        <div className="header-actions">
          <button className="btn secondary" onClick={handleExport}>
            <Download size={14} />
            Exporter
          </button>
          <button className="btn primary" onClick={handleAddClient}>
            <Plus size={14} />
            Ajouter un client
          </button>
        </div>
      </header>

      {/* Statistiques */}
      <ClientStats
        totalClients={totalClients}
        activeClients={activeClients}
        newClients={newClients}
        totalAppointments={totalAppointments}
      />

      {/* Filtres */}
      <ClientFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedService={selectedService}
        onServiceChange={setSelectedService}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        services={services}
      />

      {/* Tableau des clients */}
      <div className="table-container">
        <div className="table-header">
          <div className="results-info">
            <span className="results-count">{filteredClients.length}</span>
            <span className="results-label">clients trouvés</span>
          </div>
          <div className="sort-controls">
            <span className="sort-label">Trier par:</span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Nom</option>
              <option value="appointments">Nombre de RDV</option>
              <option value="lastAppointment">Dernier RDV</option>
            </select>
            <button
              className="sort-order-btn"
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>

        <ClientsTable
          clients={currentClients}
          onViewClient={handleViewClient}
          onSort={setSortBy}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />

        {/* Pagination */}

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
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft size={16} />
          </button>

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

          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Drawer détails client */}
      {showDrawer && selectedClient && (
        <ClientDrawer
          client={selectedClient}
          onClose={handleCloseDrawer}
          onUpdate={handleUpdateClient}
          sousService={sousService}
          onInfoUpdate={handleSave}
        />
      )}
      { showDrawerNew && selectedClient && (
        <NewClientDrawer
          client={selectedClient}
          onClose={handleCloseDrawer}
          onSave={handleSaveNew}/>
      )}
      {loader &&(<Loader/>)}
    </div>
)};

export default Clients;
