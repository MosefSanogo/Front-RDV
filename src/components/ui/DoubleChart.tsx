import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import './doubleChart.css'
export interface Chart {
    capacity: number[],
    appointment: number[],
    labels: string[]
}

export default function DoubleBarChart({data}:{data:Chart}) {
  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <BarChart
        series={[
          { data: data.capacity, label: 'Capcité totale', id: 'pvId' },
          { data: data.appointment, label: 'Rendez-vous total', id: 'uvId' },
        ]}
        xAxis={[{ data: data.labels, height: 28 }]}
        yAxis={[{ width: 50 }]}
      />
    </Box>
  );
}
