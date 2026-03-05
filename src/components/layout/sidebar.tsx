import React from "react";
import "./sidebar.css";
import {
  FiHome,
  FiCalendar,
  FiBriefcase,
  FiClock,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
function Sidebar({ style }: { style?: React.CSSProperties }) {
  const items = [
    { label: "Dashboard", icon: <FiHome />, link: "/dashboard" },
    { label: "Rendez-vous", icon: <FiCalendar />, link: "/appointements" },
    { label: "Services", icon: <FiBriefcase />, link: "/services" },
    { label: "Créneaux", icon: <FiClock />, link: "/slots" },
    { label: "Clients", icon: <FiUsers />, link: "/clients" },
    { label: "Statistiques", icon: <FiBarChart2 />, link: "/statistics" },
    { label: "Paramètres", icon: <FiSettings />, link: "/settings" },
  ];
  return (
    <div className="sidebar" style={style}>
      <div className="sidebar-header">
        <div className="logo">
            MS
        </div>
        <div className="logo-desc">
            <span className="logo-title">MaliRDV</span>
            <span className="logo-sub">
                Hopital du Mali
            </span>
        </div>
      </div>

      <div className="sidebar_items">
        {items.map((item, i) => (
          <NavLink
            key={i}
            to={item.link}
            className={
              `sidebar-item`
            }
          >
            <span className="item_icon">{item.icon}</span>
            <span className="item_label">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <button className="log-out">
        <span className="logout-icon">
            <FiLogOut/>
        </span>
        <span className="logout">Deconnexion</span>
      </button>
    </div>
  );
}

export default Sidebar;
