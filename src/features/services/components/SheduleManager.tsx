import { Save } from "lucide-react";

interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  capacity: number;
  isActive: boolean;
}
interface ScheduleManagerProps {
  schedule: Schedule[];
  onUpdate: (id: string, updates: Partial<Schedule>) => void;
  onSave?: () => void;
}
const ScheduleManager: React.FC<ScheduleManagerProps> = ({
  schedule,
  onUpdate,
  onSave: handleSave
}) => {
  return (
    <div className="schedule-manager">
      <div className="manager-header">
        <h3>Horaires de travail</h3>
        <div className="schedule-help">
          <span>🟢 Jour actif</span>
          <span>🔴 Jour inactif</span>
        </div>
      </div>

      <div className="schedule-table">
        <div className="table-header">
          <div className="header-cell">Jour</div>
          <div className="header-cell">Début</div>
          <div className="header-cell">Fin</div>
          <div className="header-cell">Capacité/h</div>
          <div className="header-cell">Statut</div>
        </div>

        <div className="table-body">
          {schedule.map((day) => (
            <div
              key={day.id}
              className={`table-row ${!day.isActive ? "inactive" : ""}`}
            >
              <div className="row-cell day-cell">{day.day}</div>

              <div className="row-cell">
                <input
                  type="time"
                  value={day.startTime}
                  onChange={(e) =>
                    onUpdate(day.id, { startTime: e.target.value })
                  }
                  disabled={!day.isActive}
                  className="time-input"
                />
              </div>

              <div className="row-cell">
                <input
                  type="time"
                  value={day.endTime}
                  onChange={(e) =>
                    onUpdate(day.id, { endTime: e.target.value })
                  }
                  disabled={!day.isActive}
                  className="time-input"
                />
              </div>

              <div className="row-cell">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={day.capacity}
                  onChange={(e) =>
                    onUpdate(day.id, {
                      capacity: parseInt(e.target.value) || 0,
                    })
                  }
                  disabled={!day.isActive}
                  className="capacity-input"
                />
              </div>

              <div className="row-cell">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={day.isActive}
                    onChange={(e) =>
                      onUpdate(day.id, { isActive: e.target.checked })
                    }
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="footer-actions">
          <button className="btn primary" onClick={handleSave}>
            <Save size={16} />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};
export default ScheduleManager;
