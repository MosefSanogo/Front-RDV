import React from 'react';
import '../styles/serviceDetailsTable.css';
interface SubService {
  id: string;
  name: string;
  appointments: number;
  absences: number;
  fillRate: number;
  peakHour: string;
}

interface Service {
  id: string;
  name: string;
  subServices: SubService[];
  totalAppointments: number;
  todayAppointments: number;
  absences: number;
  capacity: number;
  fillRate: number;
}

interface ServiceDetailsTableProps {
  services: Service[];
}

const ServiceDetailsTable: React.FC<ServiceDetailsTableProps> = ({ services }) => {

  /*const toggleRow = (serviceId: string) => {
    setExpandedRows(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };*/

  const getFillRateColor = (rate: number) => {
    if (rate >= 90) return 'var(--success)';
    if (rate >= 70) return 'var(--warning)';
    return 'var(--error)';
  };

  return (
    <div className="service-table-container">
      <table className="service-table">
        <thead>
          <tr>
            <th className="service-col">Service</th>
            <th className="stats-col">RDV totaux</th>
            <th className="stats-col">Aujourd'hui</th>
            <th className="stats-col">Absences</th>
            <th className="stats-col">Capacité</th>
            <th className="stats-col">Taux remplissage</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => {
            const fillRateColor = getFillRateColor(service.fillRate);
            
            return (
              <React.Fragment key={service.id}>
                <tr 
                  className={`service-row-tr`}
                  onClick={() =>/* toggleRow(service.id)*/{}}
                >
                  <td className="service-cell-td">
                    <span className="service-name">{service.name}</span>
                  </td>
                  <td className="stats-cell-td">{service.totalAppointments}</td>
                  <td className="stats-cell-td">{service.todayAppointments}</td>
                  <td className="stats-cell-td">
                    <span className="absences-badge">
                      {service.absences}
                    </span>
                  </td>
                  <td className="stats-cell-td">{service.capacity}/h</td>
                  <td className="stats-cell-td">
                    <div className="fill-rate">
                      <div 
                        className="fill-rate-bar"
                        style={{
                          width: `${service.fillRate}%`,
                          backgroundColor: fillRateColor
                        }}
                      />
                      <span style={{ color: fillRateColor }}>
                        {service.fillRate}%
                      </span>
                    </div>
                  </td>
                </tr>
                
                
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceDetailsTable;