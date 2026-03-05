import React from 'react';
import { 
  Phone, 
  Clock,
  AlertCircle
} from 'lucide-react';
import './appointmentsTable.css';

export interface Appointment {
  id: string;
  time: string;
  fullName: string;
  phone: string;
  service: string;
  subService?: string;
  status: 'served' | 'absent' | 'pending';
  notes?: string;
}

interface AppointmentsTableProps {
  appointments: Appointment[];
  onMarkServed?: (id: string) => void;
  onMarkAbsent?: (id: string) => void;
  onCall: (phone: string) => void;
}

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  appointments,
  onCall
}) => {
  const formatTime = (time: string) => {
    return time.replace(':', 'h');
  };

  const StatusBadge: React.FC<{ status: Appointment['status'] }> = ({ status }) => {
    const config = {
      served: {
        label: 'SERVI',
        color: 'var(--success)',
        bgColor: 'rgba(34, 197, 94, 0.1)'
      },
      absent: {
        label: 'ABSENT',
        color: 'var(--error)',
        bgColor: 'rgba(239, 68, 68, 0.1)'
      },
      pending: {
        label: 'À VENIR',
        color: 'var(--warning)',
        bgColor: 'rgba(245, 158, 11, 0.1)'
      }
    };
    
    const { label, color, bgColor } = config[status];
    
    return (
      <div 
        className="status-badge"
        style={{
          backgroundColor: bgColor,
          color: color,
          borderColor: color
        }}
      >
        {label}
      </div>
    );
  };

  /*const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'served':
        return CheckCircle;
      case 'absent':
        return XCircle;
      default:
        return Clock;
    }
  };*/


  if (appointments.length === 0) {
    return (
      <div className="empty-table">
        <AlertCircle size={48} />
        <h3>Aucun rendez-vous</h3>
        <p>Aucun rendez-vous ne correspond aux critères</p>
      </div>
    );
  }

  return (
    <div className="appointments-table-container">
      <table className="appointments-table">
        <thead>
          <tr>
            <th className="time-col">HEURE</th>
            <th className="client-col">CLIENT</th>
            <th className="phone-col">TÉLÉPHONE</th>
            <th className="service-col">SERVICE</th>
            <th className="status-col">STATUT</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => {
            
            return (
              <tr key={appointment.id} className="appointment-row">
                <td>
                  <div className="time-cell">
                    <Clock size={14} />
                    <span className="time-value">{formatTime(appointment.time)}</span>
                  </div>
                </td>
                <td>
                  <div className="client-cell">
                    <div className="client-avatar">
                      {appointment.fullName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="client-info">
                      <span className="client-name">{appointment.fullName}</span>
                      {appointment.notes && (
                        <div className="client-notes">
                          <AlertCircle size={12} />
                          <span>{appointment.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="phone-cell">
                    <span className="phone-number">{appointment.phone}</span>
                    <button 
                      className="call-btn"
                      onClick={() => onCall(appointment.phone)}
                      title="Appeler"
                    >
                      <Phone size={14} />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="service-cell">
                    <div className="service-main">{appointment.service}</div>
                    {appointment.subService && (
                      <div className="service-sub">{appointment.subService}</div>
                    )}
                  </div>
                </td>
                <td>
                  <StatusBadge status={appointment.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;