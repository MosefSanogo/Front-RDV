import React from "react";
import {
  Calendar,
  Users,
  Clock,
  BarChart3,
  CheckCircle,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  QrCode,
  TrendingUp,
  Building2,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const naviagte = useNavigate();
  const handleOnClick = () => {
    naviagte("/login");
  };
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Calendar className="logo-icon" size={28} />
            <span className="logo-text">
              MALI<span className="logo-accent">RDV</span>
            </span>
          </div>

          <div className="nav-menu">
            <a href="#accueil" className="nav-link active">
              Accueil
            </a>
            <a href="#fonctionnalites" className="nav-link">
              Fonctionnalités
            </a>
            <a href="#comment-ca-marche" className="nav-link">
              Comment ça marche
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </div>

          <div className="nav-actions">
            <button className="nav-button" onClick={handleOnClick}>
              Accéder au logiciel
            </button>   
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Organisez et gérez <br />
              <span className="hero-highlight">vos rendez-vous facilement</span>
            </h1>
            <p className="hero-subtitle">
              Un logiciel simple pour gérer les clients, les rendez-vous et
              l'organisation quotidienne de votre service.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleOnClick}>
                Accéder au logiciel
                <ArrowRight size={18} />
              </button>
              <button className="btn-secondary" onClick={handleOnClick}>
                Voir la démo
              </button>
            </div>
            <div className="hero-stats-mini">
              <div className="stat-mini">
                <span className="stat-mini-value">+10k</span>
                <span className="stat-mini-label">RDV gérés</span>
              </div>
              <div className="stat-mini">
                <span className="stat-mini-value">+50</span>
                <span className="stat-mini-label">Services</span>
              </div>
              <div className="stat-mini">
                <span className="stat-mini-value">+5</span>
                <span className="stat-mini-label">Villes</span>
              </div>
            </div>
          </div>

          <div className="hero-illustration">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="preview-title">Tableau de bord</span>
              </div>

              <div className="preview-stats">
                <div className="preview-stat-card">
                  <div className="stat-icon blue">
                    <Calendar size={16} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">RDV aujourd'hui</span>
                    <span className="stat-value">12</span>
                  </div>
                </div>
                <div className="preview-stat-card">
                  <div className="stat-icon green">
                    <Users size={16} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">Clients</span>
                    <span className="stat-value">48</span>
                  </div>
                </div>
              </div>

              <div className="preview-calendar">
                <div className="calendar-header">
                  <span>Lun</span>
                  <span>Mar</span>
                  <span>Mer</span>
                  <span>Jeu</span>
                  <span>Ven</span>
                </div>
                <div className="calendar-days">
                  {[12, 13, 14, 15, 16].map((day, i) => (
                    <div
                      key={i}
                      className={`calendar-day ${i === 2 ? "active" : ""}`}
                    >
                      <span className="day-number">{day}</span>
                      <span className="day-count">
                        {i === 2 ? "8" : i === 1 ? "5" : "3"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="preview-chart">
                <div className="chart-bars">
                  {[40, 65, 80, 55, 70, 45].map((height, i) => (
                    <div
                      key={i}
                      className="chart-bar"
                      style={{ height: `${height}%` }}
                    >
                      <div className="bar-fill"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalites" className="features-section">
        <div className="section-container">
          <h2 className="section-title">
            Fonctionnalités conçues pour{" "}
            <span className="highlight">simplifier</span>
          </h2>
          <p className="section-subtitle">
            Tout ce dont vous avez besoin pour gérer efficacement vos
            rendez-vous
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon blue">
                <Calendar size={28} />
              </div>
              <h3>Gestion des rendez-vous</h3>
              <p>
                Planifiez, modifiez et suivez tous vos rendez-vous en un clin
                d'œil.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon green">
                <Users size={28} />
              </div>
              <h3>Gestion des clients</h3>
              <p>
                Base de données clients complète avec historique et préférences.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon orange">
                <Clock size={28} />
              </div>
              <h3>Créneaux horaires automatiques</h3>
              <p>
                Générez automatiquement les créneaux selon vos disponibilités.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon purple">
                <BarChart3 size={28} />
              </div>
              <h3>Statistiques et suivi</h3>
              <p>
                Analysez votre activité avec des tableaux de bord détaillés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="comment-ca-marche" className="how-it-works-section">
        <div className="section-container">
          <h2 className="section-title">
            Comment ça <span className="highlight">marche</span>
          </h2>
          <p className="section-subtitle">
            Trois étapes simples pour commencer
          </p>

          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Créer votre service</h3>
                <p>
                  Inscrivez votre service en quelques clics et configurez vos
                  informations.
                </p>
              </div>
              <div className="step-arrow">
                <ChevronRight size={24} />
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Configurer les horaires</h3>
                <p>Définissez vos disponibilités et la capacité par créneau.</p>
              </div>
              <div className="step-arrow">
                <ChevronRight size={24} />
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Gérer vos rendez-vous</h3>
                <p>
                  Commencez à recevoir et gérer les réservations de vos clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="section-container">
          <h2 className="section-title">
            Des <span className="highlight">avantages</span> concrets
          </h2>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <CheckCircle size={32} />
              </div>
              <h3>Organisation efficace</h3>
              <p>Plus de confusion, une vue claire sur votre planning.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Clock size={32} />
              </div>
              <h3>Gain de temps</h3>
              <p>
                Automatisez les tâches répétitives et gagnez en productivité.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Smartphone size={32} />
              </div>
              <h3>Interface simple</h3>
              <p>Une expérience utilisateur intuitive pour toute l'équipe.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <QrCode size={32} />
              </div>
              <h3>QR code pour validation</h3>
              <p>Validez les rendez-vous en scannant simplement un QR code.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            <div className="stat-card">
              <TrendingUp size={40} className="stat-icon" />
              <div className="stat-number">+10 000</div>
              <div className="stat-description">rendez-vous gérés</div>
            </div>

            <div className="stat-card">
              <Building2 size={40} className="stat-icon" />
              <div className="stat-number">+50</div>
              <div className="stat-description">services actifs</div>
            </div>

            <div className="stat-card">
              <MapPin size={40} className="stat-icon" />
              <div className="stat-number">+5</div>
              <div className="stat-description">villes couvertes</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Prêt à simplifier votre gestion de rendez-vous ?
          </h2>
          <p className="cta-subtitle">
            Rejoignez les services qui nous font confiance
          </p>
          <button className="cta-button" onClick={handleOnClick}>
            Commencer maintenant
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <Calendar className="footer-logo-icon" size={24} />
                <span>
                  MALI<span className="logo-accent">RDV</span>
                </span>
              </div>
              <p className="footer-description">
                Solution complète de gestion de rendez-vous pour entreprises et
                services publics.
              </p>
            </div>

            <div className="footer-col">
              <h4>Liens rapides</h4>
              <ul>
                <li>
                  <a href="#accueil">Accueil</a>
                </li>
                <li>
                  <a href="#fonctionnalites">Fonctionnalités</a>
                </li>
                <li>
                  <a href="#comment-ca-marche">Comment ça marche</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Légal</h4>
              <ul>
                <li>
                  <a href="#">Mentions légales</a>
                </li>
                <li>
                  <a href="#">Politique de confidentialité</a>
                </li>
                <li>
                  <a href="#">CGU</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul className="contact-list">
                <li>
                  <Mail size={16} />
                  <span>contact@rendezvouspro.com</span>
                </li>
                <li>
                  <Phone size={16} />
                  <span>+223 76 00 00 00</span>
                </li>
                <li>
                  <MapPin size={16} />
                  <span>Bamako, Mali</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 RendezVousPro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
