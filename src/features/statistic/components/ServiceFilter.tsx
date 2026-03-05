import React from 'react';
import { Filter } from 'lucide-react';
import '../styles/serviceFilter.css';
interface ServiceFilterProps {
  selectedService: string;
  onServiceChange: (service: string) => void;
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({
  selectedService,
  onServiceChange
}) => {
  const services = [
    { id: 'all', name: 'Tous les services' },
    { id: 'consultation', name: 'Consultation' },
    { id: 'laboratoire', name: 'Laboratoire' },
    { id: 'radiologie', name: 'Radiologie' },
    { id: 'urgence', name: 'Urgences' }
  ];

  return (
    <div className="service-filter">
      <Filter size={16} />
      <select
        value={selectedService}
        onChange={(e) => onServiceChange(e.target.value)}
        className="service-select"
      >
        {services.map(service => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ServiceFilter;