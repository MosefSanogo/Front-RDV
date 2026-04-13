import { Save, User, X } from "lucide-react";
import React, { useState } from "react";
import type { Client } from "../../../config/Types";
import { sanitizeInput } from "../../../utils/Sanitize";
interface NewClientProps {
  onClose: () => void;
  onSave?: (data: newClient) => void;
  client: Client;
}
export interface newClient {
  prenom: string;
  nom: string;
  telephone: string;
}
const NewClientDrawer: React.FC<NewClientProps> = ({
  onClose,
  onSave,
  client,
}) => {
  const [newClient, setNewClient] = useState<newClient>({
    prenom: "",
    nom: "",
    telephone: "",
  });
  const handleSave = () => {
    onSave?.(newClient);
  };
  return (
    <div className="client-drawer-overlay new-client">
      <div className="client-drawer">
        <div className="drawer-header">
          <div className="header-left">
            <h2 className="drawer-title">
              <User size={20} />
              Fiche client
            </h2>
            <div className="client-id">ID: {10242575421}</div>
          </div>
          <div className="header-actions">
            <button className="header-btn save" onClick={handleSave}>
              <Save size={15} />
              Enregistrer
            </button>
            <button className="close-btn" onClick={onClose} data-testid="close-btn">
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="drawer-content">
          {/* Profil */}
          <div className="profile-section">
            <div className="profile-avatar">
              {client.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="profile-info">
              <h3 className="profile-name">{client.fullName}</h3>

              <div className="profile-meta">
                <div className="profile-status">
                  {client.status === "active" && "Client actif"}
                  {client.status === "inactive" && "Client inactif"}
                  {client.status === "new" && "Nouveau client"}
                </div>
              </div>
            </div>
          </div>
          <form className="client-form">
          <div className="client-form-group">
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              id="prenom"
              className="edit-input"
              onChange={(e) =>
                setNewClient({ ...newClient, prenom: sanitizeInput(e.target.value, 'text', {maxLength:100,required:true}).value as string })
              }
              required
            />
          </div>
          <div className="client-form-group">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              className="edit-input"
              onChange={(e) =>
                setNewClient({ ...newClient, nom: sanitizeInput(e.target.value,'text',{maxLength:100,required:true}).value as string })
              }
              required
            />
          </div>
          <div className="client-form-group">
            <label htmlFor="tel">Téléphone</label>
            <input
              type="text"
              id="tel"
              className="edit-input"
              onChange={(e) =>
                setNewClient({ ...newClient, telephone: sanitizeInput(e.target.value, 'phone',{maxLength:8,required:true}).value as string })
              }
              required
              minLength={8}
              maxLength={8}
            />
          </div>
        </form>
        </div>
        
      </div>
    </div>
  );
};

export default NewClientDrawer;
