export interface Service {
  id: string;
  name: string;
  description?: string;
  city: string;
  address?: string;
  category: string;
  subServices?: SubService[] | number;
  status: 'active' | 'inactive';
  capacity: number;
  appointmentsToday: number;
  color: string;
}
export interface Service_Info {
    id: string;
    nom: string;
    description: string;
    ville: string;
    adresse: string;
    image_url?: string;
    category: string;
    status: 'active' | 'inactive';
}
export interface SubService {
  id: string;
  name: string;
  localisation?: string;
  category?: string;
  description?: string;
  appointmentsToday: number;
  status: 'active' | 'inactive';
  capacity?: number;
}

export interface SubService_Info {
    id: string;
    nom: string;
    status?: 'active' | 'inactive';
}

export interface Client {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  totalAppointments: number;
  lastAppointment: string | null;
  status: 'active' | 'inactive' | 'new';
  absences: number;
  services: string[];
  createdAt: string;
  notes?: string;
}
export interface ClientInfo{
    id: string | number;
    service: string;
    note: string;
}
export interface ClientDrawerProps {
  client: Client;
  onClose: () => void;
  onUpdate: (client: Client) => void;
  onInfoUpdate: (clientInfo: ClientInfo) => void;
  sousService: string;
}

export interface ClientsTableProps {
  clients: Client[];
  onViewClient: (client: Client, sousService: string) => void;
  onSort: (field: string) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface ClientFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedService: string;
  onServiceChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  services: { id: string; name: string }[];
}

export interface ClientStatsProps {
  totalClients: number;
  activeClients: number;
  newClients: number;
  totalAppointments: number;
}

// Rendez-vous d'aujourd'hui
export interface RendezVous {
  id: number;
  citoyen_id: number;
  service_id: number;
  sous_service_id: number;
  time_slot_id: number;
  date: string; // Format ISO: "2026-01-30T23:00:00.000Z"
  heure: string; // Format: "HH:MM:SS"
  statut: 'Valide' | 'Annulé' | 'En attente' | string; // Si d'autres statuts possibles
  qr_token: string; // UUID
  created_at: string; // Format ISO
  nom: string;
  prenom: string;
  tel: string; // Format téléphone,
  sous_service_nom: string; // Nom du sous-service pour affichage
}