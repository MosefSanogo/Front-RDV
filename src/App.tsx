import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Sidebar from "./components/layout/sidebar";
import Dashboard from "./features/dashboard/pages/Dashboard";
import AppointmentsPage from "./features/appointement/pages/Appointement";
import ServicesPage from "./features/services/page/Service";
import SheduleManagerPage from "./features/services/page/SheduleManagerPage";
import Creneaux from "./features/creneaux/pages/Creneaux";
import Clients from "./features/clients/pages/Clients";
import StatisticsPage from "./features/statistic/pages/StatisticsPage";
import SettingsPage from "./features/settings/pages/SettingsPage";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { AuthContext, type Service } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";
import PrivateRoute from "./contexts/PrivateRoute";

// ✅ Composant enfant — à l'INTÉRIEUR de BrowserRouter
// useLocation() fonctionne ici car ce composant est rendu sous <BrowserRouter>
function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideSidebarRoutes: string[] = ["/", "/login", "/register"];
  const shouldHideSidebar: boolean = hideSidebarRoutes.includes(
    location.pathname,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState<Service | null>(() => {
    const storedUser = localStorage.getItem("service");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const login = (data: Service) => {
    setIsAuth(true);
    setUser(data);
  };
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("service");
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("email"); 
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, user, setUser }}>
      <div className="app">
        {!shouldHideSidebar && (
          <div className="app-sidebar">
            <Sidebar open={isSidebarOpen} />
          </div>
        )}
        <div className={`btn-sidebar-open ${isSidebarOpen ? "open" : ""}`} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          className={`app-main ${isSidebarOpen ? "open" : ""}`}
          style={shouldHideSidebar ? { marginLeft: "0" } : undefined}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/appointements" element={<PrivateRoute><AppointmentsPage /></PrivateRoute>} />
            <Route path="/services" element={<PrivateRoute><ServicesPage /></PrivateRoute>} />
            <Route
              path="/services/schedule/:id"
              element={<PrivateRoute><SheduleManagerPage /></PrivateRoute>}
            />
            <Route path="/slots" element={<PrivateRoute><Creneaux /></PrivateRoute>} />
            <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
            <Route path="/statistics" element={<PrivateRoute><StatisticsPage /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
            
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AuthContext.Provider>
  );
}

// ✅ App — contient BrowserRouter et AuthContext uniquement
function App() {
  return (
      <BrowserRouter>
        <AppLayout /> {/* useLocation() accessible ici ✅ */}
      </BrowserRouter>
  );
}

export default App;
