export const ScheduleData = [
    {
      id: "1",
      day: "Lundi",
      startTime: "08:00",
      endTime: "16:00",
      capacity: 5,
      isActive: true,
    },
    {
      id: "2",
      day: "Mardi",
      startTime: "08:00",
      endTime: "16:00",
      capacity: 5,
      isActive: true,
    },
    {
      id: "3",
      day: "Mercredi",
      startTime: "08:00",
      endTime: "12:00",
      capacity: 4,
      isActive: true,
    },
    {
      id: "4",
      day: "Jeudi",
      startTime: "08:00",
      endTime: "16:00",
      capacity: 5,
      isActive: true,
    },
    {
      id: "5",
      day: "Vendredi",
      startTime: "08:00",
      endTime: "16:00",
      capacity: 5,
      isActive: true,
    },
    {
      id: "6",
      day: "Samedi",
      startTime: "08:00",
      endTime: "12:00",
      capacity: 3,
      isActive: true,
    },
    {
      id: "7",
      day: "Dimanche",
      startTime: "00:00",
      endTime: "00:00",
      capacity: 0,
      isActive: false,
    },
  ];

export interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  capacity: number;
  isActive: boolean;
}