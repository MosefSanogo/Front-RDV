import React from 'react';
import '../styles/appointmentsChart.css';
interface ChartData {
  hour: string;
  appointments: number;
  capacity: number;
}

interface AppointmentsChartProps {
  data: ChartData[];
}

const AppointmentsChart: React.FC<AppointmentsChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.appointments, d.capacity)));

  return (
    <div className="appointments-chart">
      <div className="chart-container">
        {data.map((item, index) => {
          const appointmentHeight = (item.appointments / maxValue) * 100;
          const capacityHeight = (item.capacity / maxValue) * 100;
          
          return (
            <div key={index} className="chart-column">
              <div className="bars-container">
                <div 
                  className="bar capacity"
                  style={{ height: `${capacityHeight}%` }}
                />
                <div 
                  className="bar appointments"
                  style={{ height: `${appointmentHeight}%` }}
                />
              </div>
              <div className="hour-label">{item.hour}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentsChart;