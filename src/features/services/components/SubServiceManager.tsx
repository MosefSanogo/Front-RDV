import { Plus, Power, Trash2, Users } from "lucide-react";
import { useState } from "react";

interface SubService {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  capacity: number;
}

interface SubServiceManagerProps {
  subServices: SubService[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<SubService>) => void;
  onDelete: (id: string) => void;
}

const SubServiceManager: React.FC<SubServiceManagerProps> = ({ subServices, onAdd, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="subservice-manager">
      <div className="manager-header">
        <h3>Sous-services</h3>
        <button className="btn small" onClick={onAdd}>
          <Plus size={14} />
          Ajouter
        </button>
      </div>

      {subServices.length === 0 ? (
        <div className="empty-state">
          <p>Aucun sous-service configuré</p>
          <button className="btn secondary small" onClick={onAdd}>
            <Plus size={14} />
            Ajouter un sous-service
          </button>
        </div>
      ) : (
        <div className="subservices-list">
          {subServices.map(sub => (
            <div key={sub.id} className="subservice-item">
              <div className="subservice-info">
                {editingId === sub.id ? (
                  <input
                    type="text"
                    value={sub.name}
                    onChange={(e) => onUpdate(sub.id, { name: e.target.value })}
                    className="edit-input"
                    onBlur={() => setEditingId(null)}
                    autoFocus
                  />
                ) : (
                  <div className="subservice-name" onClick={() => setEditingId(sub.id)}>
                    {sub.name}
                    {sub.description && (
                      <span className="subservice-description">{sub.description}</span>
                    )}
                  </div>
                )}
                
                <div className="subservice-meta">
                  <span className="capacity-badge">
                    <Users size={12} />
                    {sub.capacity}/h
                  </span>
                  <div className={`status-dot ${sub.status}`} />
                </div>
              </div>
              
              <div className="subservice-actions">
                <button 
                  className="action-btn"
                  onClick={() => onUpdate(sub.id, { 
                    status: sub.status === 'active' ? 'inactive' : 'active' 
                  })}
                >
                  {sub.status === 'active' ? <Power size={14} /> : <Power size={14} />}
                </button>
                <button 
                  className="action-btn danger"
                  onClick={() => onDelete(sub.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubServiceManager;