import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthorized(false);
      return;
    }

    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAuthorized(true);
    } catch (error) {
      console.log(error)
      localStorage.removeItem("token");
      localStorage.removeItem("service");
      setAuthorized(false);
    }
  };

  checkAuth();
}, []);

  if (authorized === null) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}>
        <CircularProgress size={20} />
        <p>Vérification de l'authentification...</p>
      </div>
    );
  }

  if (!authorized) return <Navigate to="/" />;

  return children;
}