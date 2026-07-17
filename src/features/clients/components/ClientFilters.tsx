import React from "react";
import { Filter, Search, X } from "lucide-react";
import "../styles/clientFilter.css";
import type { ClientFiltersProps } from "../../../config/Types";

const ClientFilters: React.FC<ClientFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedService,
  onServiceChange,
  selectedStatus,
  onStatusChange,
  services,
}) => {
  const statuses = [
    { id: "all", name: "Tous les statuts" },
    { id: "active", name: "Actif" },
    { id: "inactive", name: "Inactif" },
    { id: "new", name: "Nouveau" },
  ];

  const handleClearSearch = () => {
    onSearchChange("");
  };

  return (
    <div className="client-filters">
      <div className="search-wrapper">
        <div className="search-box">
          <div className="search-icon-box">
            <Search size={16} className="search-icon" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un client"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-btn" onClick={handleClearSearch}>
              <X size={24} />
            </button>
          )}
        </div>
      </div>

      <div className="filters-wrapper">
        <div className="filter-group">
          <div className="filter-select">
            <Filter size={16} />
            <select
              value={selectedService}
              onChange={(e) => onServiceChange(e.target.value)}
              className="filter-select-input"
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
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="filter-select-input"
            >
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFilters;
