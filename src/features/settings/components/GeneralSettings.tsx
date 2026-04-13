import React, { useState } from 'react';
import { Building2, Phone, Mail, MapPin, Upload, X } from 'lucide-react';
import '../styles/generalSettings.css';
import { AuthContext } from '../../../contexts/AuthContext';
export interface GeneralSettingsData {
  id:number;
  agencyName: string;
  address: string;
  phone: string;
  email: string;
  ville: string;
  img: string | null;
  category: string;
  welcomeMessage: string;
}
const GeneralSettings: React.FC= () => {
  const { user } = React.useContext(AuthContext);
  const [formData, setFormData] = useState<GeneralSettingsData>({
    id: Number(user?.id) || 0,
    agencyName: user?.nom || 'Mon agence',
    phone: user?.tel || '+223 XX XX XX XX',
    email: user?.email || '',
    address: user?.adresse || '',
    ville: user?.ville || '',
    img: user?.image_url || null,
    category: user?.category || '',
    welcomeMessage: user?.description || 'Bienvenue chez nous ! Merci de choisir notre service pour vos rendez-vous. Nous sommes impatients de vous accueillir et de vous offrir la meilleure expérience possible.',  
  });

  const [logo, setLogo] = useState<string | null>(formData.img);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, img: reader.result as string }));
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
  };

  return (
    <div className="general-settings">
      <h2 className="section-title">
        <Building2 size={20} />
        Informations générales
      </h2>

      <div className="settings-grid">
        {/* Logo */}
        <div className="form-group logo-group">
          <label>Logo de l'agence</label>
          <div 
            className={`logo-upload ${isDragging ? 'dragging' : ''} ${logo ? 'has-logo' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {logo ? (
              <div className="logo-preview">
                <img  src={`${import.meta.env.VITE_BASE_URL}/${formData.img}`}  alt="Logo" />
                <button className="remove-logo" onClick={removeLogo} disabled>
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <Upload size={32} />
                <p>Glissez-déposez votre logo ici</p>
                <span>ou</span>
                <label className="upload-btn">
                  Parcourir
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleLogoUpload}
                    hidden
                  />
                </label>
              </>
            )}
          </div>
        </div>

        {/* Nom de l'agence */}
        <div className="form-group full-width">
          <label htmlFor="agencyName">
            <Building2 size={16} />
            Nom de l'agence / service
          </label>
          <input
            type="text"
            id="agencyName"
            name="agencyName"
            value={formData.agencyName}
            onChange={handleInputChange}
            placeholder="Ex: Centre Médical Principal"
            className="form-input"
            disabled
          />
        </div>

        {/* Téléphone */}
        <div className="form-group">
          <label htmlFor="phone">
            <Phone size={16} />
            Téléphone principal
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+223 XX XX XX XX"
            className="form-input"
            disabled
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">
            <Mail size={16} />
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="contact@agence.ml"
            className="form-input"
            disabled
          />
        </div>

        {/* Adresse */}
        <div className="form-group full-width">
          <label htmlFor="address">
            <MapPin size={16} />
            Adresse
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Adresse complète"
            className="form-input"
            disabled
          />
        </div>

        {/* Message d'accueil */}
        <div className="form-group full-width">
          <label htmlFor="welcomeMessage">
            Message affiché aux clients
          </label>
          <textarea
            id="welcomeMessage"
            name="welcomeMessage"
            value={formData.welcomeMessage}
            onChange={handleInputChange}
            placeholder="Instructions, informations importantes..."
            className="form-textarea"
            rows={2}
            disabled
          />
          <p className="help-text">
            Ce message sera visible par les clients lors de la confirmation de rendez-vous
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;