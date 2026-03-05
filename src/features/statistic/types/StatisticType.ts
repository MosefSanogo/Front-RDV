export interface Period {
  id: "day" | "week" | "month" | "year";
  label: string;
}

export interface KPI {
  id: string;
  label: string;
  value: number | string;
  icon: React.ComponentType<{ size: number }>;
  color: string;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
}

export interface ServiceStat {
  id: string;
  name: string;
  subServices: SubServiceStat[];
  totalAppointments: number;
  todayAppointments: number;
  absences: number;
  capacity: number;
  fillRate: number;
}

export interface SubServiceStat {
  id: string;
  name: string;
  appointments: number;
  absences: number;
  fillRate: number;
  peakHour: string;
}

export interface Static {
  id: string;
  label: string;
  value: number | string;
}

export interface HourlyData {
  hour: string;
  appointments: number;
  capacity: number;
}

export interface MonthlyTrend {
  month: string;
  appointments: number;
}