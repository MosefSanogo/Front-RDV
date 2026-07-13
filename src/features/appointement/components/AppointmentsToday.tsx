import "./appointmentsToday.css";

interface Appointment {
  id: number;
  heure: string;
  client: string;
  service: string;
  statut: string;
  isActive?: boolean;
}

export default function AppointmentsToday({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const status = {
    "PENDING": "En attente",
    "CONFIRMED": "Confirmé",
    "CANCELLED": "Annulé",
  };
  return (
    <div className="appointments-card">
      <div className="appointments-header">
        <h3>Rendez-vous d’aujourd’hui</h3>
        <span className="appointments-count">{appointments.length}</span>
      </div>

      <div className="appointments-table-wrapper">
        <table className="appointments-table appointments-table-wrapper">
          <thead>
            <tr>
              <th>Heure</th>
              <th>Client</th>
              <th>Sous Service</th>
              <th>Statut</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 && (
              <tr className="empty-row">
                <td colSpan={5}>Aucun rendez-vous aujourd’hui</td>
              </tr>
            )}

            {appointments.map((rdv) => (
              <tr key={rdv.id} className={rdv.isActive ? "active" : ""}>
                <td className="time">{rdv.heure.slice(0,5).replace(":","h")}</td>
                <td>{rdv.client}</td>
                <td>{rdv.service}</td>
                <td>
                  <span className={`status ${rdv.statut.toUpperCase() === "PENDING" ? "pending" : rdv.statut === "CONFIRMED" ? "confirmed" : "cancelled"}`}>
                    {status[rdv.statut.toUpperCase() as keyof typeof status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
