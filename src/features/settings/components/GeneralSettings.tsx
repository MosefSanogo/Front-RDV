import React, { useState } from 'react';
import { Building2, Phone, Mail, MapPin, Upload, X } from 'lucide-react';
import '../styles/generalSettings.css';
const GeneralSettings: React.FC = () => {
  const [formData, setFormData] = useState({
    agencyName: 'Centre Médical Principal',
    phone: '+223 76 00 00 00',
    email: 'contact@centremedical.ml',
    address: 'Avenue de l\'Indépendance, Bamako',
    welcomeMessage: 'Veuillez arriver 10 minutes avant votre rendez-vous. Merci de présenter votre pièce d\'identité.'
  });

  const [logo, setLogo] = useState<string | null>(null);
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
                <img src={logo} alt="Logo" />
                <button className="remove-logo" onClick={removeLogo}>
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
            rows={4}
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