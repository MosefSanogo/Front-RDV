import React, { useContext, useEffect, useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { sanitizeInput } from "../../utils/Sanitize";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(
    localStorage.getItem("rememberMe") === "true"
      ? localStorage.getItem("email") || ""
      : "",
  );
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true",
  );
  const { isAuth, login } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log("Login successful:", response.data);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "service",
            JSON.stringify(response.data.service),
          );
          login(response.data.service);
        }
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("email", email);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("email");
          localStorage.removeItem("service");
        }
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login failed:", error.response?.data || error.message);
        toast.error(
          error.response?.data?.message ||
            "Échec de la connexion. Veuillez vérifier vos identifiants.",
        );
      });
  };

  return (
    <div className="login-page">
      {/* Split screen layout */}
      <div className="login-container">
        {/* Left side - Illustration */}
        <div className="login-illustration">
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
                    <Calendar size={16} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">RDV aujourd'hui</span>
                    <span className="stat-value">24</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon green">
                    <Users size={16} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">Clients</span>
                    <span className="stat-value">156</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon purple">
                    <BarChart3 size={16} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">Taux</span>
                    <span className="stat-value">87%</span>
                  </div>
                </div>
              </div>

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
                  <CheckCircle size={16} className="feature-check" />
                  <span>Gestion simplifiée des rendez-vous</span>
                </div>
                <div className="feature-item">
                  <CheckCircle size={16} className="feature-check" />
                  <span>Tableau de bord en temps réel</span>
                </div>
                <div className="feature-item">
                  <CheckCircle size={16} className="feature-check" />
                  <span>Validation par QR code</span>
                </div>
              </div>
            </div>

            <div className="illustration-footer">
              <p className="testimonial">
                "La solution idéale pour gérer nos rendez-vous au quotidien"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <span className="author-name">Dr. Sanogo Mohamed</span>
                  <span className="author-title">Centre Médical Bamako</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="login-form-container">
          <div className="login-form-card">
            <div className="form-header">
              <h1 className="form-title">Connexion</h1>
              <p className="form-subtitle">Accédez à votre espace de gestion</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Input */}
              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  Adresse email
                </label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        sanitizeInput(e.target.value, "email").value as string,
                      )
                    }
                    required
                    pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                    title="Veuillez entrer une adresse email valide (ex: exemple@email.com)"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="input-group">
                <label htmlFor="password" className="input-label">
                  Mot de passe
                </label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="input-field"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) =>
                      setPassword(sanitizeInput(e.target.value).value as string)
                    }
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">Se rappeler de moi</span>
                </label>
                <NavLink to="/forgot-password" className="forgot-link">
                  Mot de passe oublié ?
                </NavLink>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-button">
                Se connecter
                <ArrowRight size={18} />
              </button>

              {/* Sign up link */}
              <div className="signup-link">
                <span>Vous n'avez pas de compte ?</span>
                <NavLink to="/register" className="signup-link-text">
                  Créer un compte
                </NavLink>
              </div>
            </form>

            {/* Security badges */}
            <div className="security-badges">
              <div className="security-badge">
                <div className="badge-dot"></div>
                <span>Connexion sécurisée</span>
              </div>
              <div className="security-badge">
                <div className="badge-dot"></div>
                <span>Chiffrement SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
