import React, { useState } from "react";
import {
  Building2,
  MapPin,
  Tag,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Upload,
  CheckCircle,
  Calendar,
  Users,
  BarChart3,
  ChevronDown,
  X,
  ArrowRight,
} from "lucide-react";
import "./register.css";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader";
import { sanitizeInput } from "../../utils/Sanitize";

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // Form state
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    ville: "",
    adresse: "",
    categorie: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const cleanedValue = name === "email" ? sanitizeInput(value, name === "email" ? "email" : "") : sanitizeInput(value, "text");
    setFormData((prev) => ({
      ...prev,
      [name]: cleanedValue.value,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();

      data.append("nom", formData.serviceName);
      data.append("description", formData.description);
      data.append("ville_id", "1");
      data.append("adresse", formData.adresse);
      data.append("category", formData.categorie);
      data.append("tel", formData.telephone);
      data.append("email", formData.email);
      data.append("password", formData.password);

      // 🔥 IMPORTANT : fichier réel
      if (formData.image) {
        data.append("image", formData.image); // ⚠️ DOIT être un File
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/service/register`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Service enregistré avec succès !");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.error("Error registering service:", error);
      toast.error("Erreur lors de l'enregistrement du service.");
    } finally {
      setLoading(false);
    }
  };

  // Options pour les selects
  const villes = [
    "Bamako",
    "Sikasso",
    "Ségou",
    "Mopti",
    "Koutiala",
    "Kayes",
    "Gao",
    "Kidal",
  ];

  const categories = [
    "Centre de santé",
    "Laboratoire",
    "Cabinet médical",
    "Radiologie",
    "Clinique",
    "Pharmacie",
    "Service administratif",
    "Autre",
  ];

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left side - Illustration */}
        <div className="register-illustration">
          <div className="illustration-content">
            <div className="illustration-header">
              <div className="logo">
                <Calendar className="logo-icon" size={28} />
                <span className="logo-text">
                  MALI<span className="logo-accent">RDV</span>
                </span>
              </div>
              <div className="illustration-badge">
                <span className="badge-text">
                  Plateforme de gestion de rendez-vous
                </span>
              </div>
            </div>

            <div className="dashboard-preview">
              {/* Stats Cards */}
              <div className="preview-stats">
                <div className="stat-card">
                  <div className="stat-icon blue">
                    <Calendar size={18} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">RDV aujourd'hui</span>
                    <span className="stat-value">24</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon green">
                    <Users size={18} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">Services</span>
                    <span className="stat-value">50+</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon purple">
                    <BarChart3 size={18} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">Taux</span>
                    <span className="stat-value">87%</span>
                  </div>
                </div>
              </div>

              {/* Activity Chart */}
              {/* Calendar Preview */}
              <div className="preview-calendar">
                <div className="calendar-header">
                  <span>Lun</span>
                  <span>Mar</span>
                  <span>Mer</span>
                  <span>Jeu</span>
                  <span>Ven</span>
                </div>
                <div className="calendar-grid">
                  {[12, 13, 14, 15, 16].map((day, i) => (
                    <div
                      key={i}
                      className={`calendar-day ${i === 2 ? "active" : ""}`}
                    >
                      <span className="day-number">{day}</span>
                      {i === 2 && <span className="day-badge">8</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Chart */}
              <div className="preview-chart">
                <div className="chart-bars">
                  {[45, 70, 85, 55, 65].map((height, i) => (
                    <div key={i} className="chart-bar">
                      <div
                        className="bar-fill"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature List */}
              <div className="feature-list">
                <div className="feature-item">
                  <CheckCircle size={18} className="feature-check" />
                  <div className="feature-text">
                    <strong>Création rapide</strong>
                    <span>Inscription en moins de 2 minutes</span>
                  </div>
                </div>
                <div className="feature-item">
                  <CheckCircle size={18} className="feature-check" />
                  <div className="feature-text">
                    <strong>Gestion complète</strong>
                    <span>Services, horaires et rendez-vous</span>
                  </div>
                </div>
                <div className="feature-item">
                  <CheckCircle size={18} className="feature-check" />
                  <div className="feature-text">
                    <strong>Support prioritaire</strong>
                    <span>Accompagnement à l'installation</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="illustration-footer">
              <p className="testimonial">
                "Rejoignez plus de 50 services qui nous font confiance"
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Registration Form */}
        <div className="register-form-container">
          <div className="register-form-card">
            <div className="form-header">
              <h1 className="form-title">Créer un compte</h1>
              <p className="form-subtitle">
                Commencez à gérer vos rendez-vous en quelques minutes
              </p>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              {/* Section: Informations du service */}
              <div className="form-section">
                <h2 className="section-title">
                  <Building2 size={18} />
                  Informations du service
                </h2>

                <div className="form-grid">
                  {/* Logo Upload */}
                  <div className="form-group full-width">
                    <label className="input-label">Logo du service</label>
                    <div className="logo-upload-container">
                      {logoPreview ? (
                        <div className="logo-preview">
                          <img src={logoPreview} alt="Logo preview" />
                          <button
                            type="button"
                            className="remove-logo"
                            onClick={removeLogo}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="upload-area">
                          <Upload size={24} className="upload-icon" />
                          <span className="upload-text">
                            Télécharger un logo
                          </span>
                          <span className="upload-hint">
                            PNG, JPG (max. 2 Mo)
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="upload-input"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Nom du service */}
                  <div className="form-group">
                    <label htmlFor="serviceName" className="input-label">
                      Nom du service <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="serviceName"
                      name="serviceName"
                      value={formData.serviceName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="ex: Centre Médical Bamako"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="form-group">
                    <label htmlFor="description" className="input-label">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Brève description de votre service..."
                      rows={3}
                    />
                  </div>

                  {/* Ville */}
                  <div className="form-group">
                    <label htmlFor="ville" className="input-label">
                      Ville <span className="required">*</span>
                    </label>
                    <div className="select-wrapper">
                      <MapPin size={16} className="select-icon" />
                      <select
                        id="ville"
                        name="ville"
                        value={formData.ville}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="">Sélectionnez une ville</option>
                        {villes.map((ville) => (
                          <option key={ville} value={ville}>
                            {ville}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="select-arrow" />
                    </div>
                  </div>

                  {/* Adresse */}
                  <div className="form-group">
                    <label htmlFor="adresse" className="input-label">
                      Adresse
                    </label>
                    <input
                      type="text"
                      id="adresse"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Adresse complète"
                    />
                  </div>

                  {/* Catégorie */}
                  <div className="form-group">
                    <label htmlFor="categorie" className="input-label">
                      Catégorie <span className="required">*</span>
                    </label>
                    <div className="select-wrapper">
                      <Tag size={16} className="select-icon" />
                      <select
                        id="categorie"
                        name="categorie"
                        value={formData.categorie}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="select-arrow" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Informations du compte */}
              <div className="form-section">
                <h2 className="section-title">Informations du compte</h2>

                <div className="form-grid">
                  {/* Téléphone */}
                  <div className="form-group">
                    <label htmlFor="telephone" className="input-label">
                      Téléphone <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <Phone size={16} className="input-icon" />
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        className="form-input with-icon"
                        placeholder="76 00 00 00"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email" className="input-label">
                      Email <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <Mail size={16} className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input with-icon"
                        placeholder="exemple@email.com"
                        required
                        pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                        title="Veuillez entrer une adresse email valide (ex: exemple@email.com)"
                      />
                    </div>
                  </div>

                  {/* Mot de passe */}
                  <div className="form-group">
                    <label htmlFor="password" className="input-label">
                      Mot de passe <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <Lock size={16} className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-input with-icon"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirmer mot de passe */}
                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="input-label">
                      Confirmer le mot de passe{" "}
                      <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <Lock size={16} className="input-icon" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="form-input with-icon"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conditions */}
              <div className="terms-section">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" required />
                  <span className="checkbox-text">
                    J'accepte les <a href="#">conditions d'utilisation</a> et la
                    <a href="#"> politique de confidentialité</a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-button">
                Créer un compte
                <ArrowRight size={18} />
              </button>

              {/* Login link */}
              <div className="login-link">
                <span>Vous avez déjà un compte ?</span>
                <button
                  className="login-link-text"
                  onClick={() => window.history.back()}
                >
                  Se connecter
                </button>
              </div>
            </form>

            {/* Security badges */}
            <div className="security-badges">
              <div className="security-badge">
                <div className="badge-dot"></div>
                <span>Inscription sécurisée</span>
              </div>
              <div className="security-badge">
                <div className="badge-dot"></div>
                <span>Chiffrement SSL</span>
              </div>
              <div className="security-badge">
                <div className="badge-dot"></div>
                <span>Sans engagement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default RegisterPage;
