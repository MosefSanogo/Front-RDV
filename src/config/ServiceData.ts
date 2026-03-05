import type { SubService } from "./Types";

export const ServiceData : SubService[] = [
    {
      id: "1",
      name: "Centre Médical Principal",
      localisation: "Bamako",
      category: "Santé",
      status: "active",
      capacity: 8,
      appointmentsToday: 12,
    },
    {
      id: "2",
      name: "Laboratoire d'Analyses",
      localisation: "Bamako",
      category: "Laboratoire",
      status: "active",
      capacity: 6,
      appointmentsToday: 8,
    },
    {
      id: "3",
      name: "Radiologie",
      localisation: "Bamako",
      category: "Imagerie Médicale",
      status: "active",
      capacity: 4,
      appointmentsToday: 6,
    },
    {
      id: "4",
      name: "Centre de Vaccination",
      localisation: "Kati",
      category: "Santé Publique",
      status: "inactive",
      capacity: 5,
      appointmentsToday: 0,
    },
    {
      id: "5",
      name: "Consultation Générale",
      localisation: "Sikasso",
      category: "Santé",
      status: "active",
      capacity: 7,
      appointmentsToday: 9,
    },
  ];