import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/sidebar";
import Dashboard from "./features/dashboard/pages/Dashboard";
import AppointmentsPage from "./features/appointement/pages/Appointement";
import ServicesPage from "./features/services/page/Service";
import SheduleManagerPage from "./features/services/page/SheduleManagerPage";
import Creneaux from "./features/creneaux/pages/Creneaux";
import Clients from "./features/clients/pages/Clients";
import StatisticsPage from "./features/statistic/pages/StatisticsPage";
import SettingsPage from "./features/settings/pages/SettingsPage";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="app-sidebar">
          <Sidebar />
        </div>
        <div className="app-main">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointements" element={<AppointmentsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/schedule/:id" element={<SheduleManagerPage />} />
            <Route path="/slots" element={<Creneaux/>} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
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
    </BrowserRouter>
  );
}

export default App;
