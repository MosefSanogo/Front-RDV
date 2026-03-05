import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
export interface DispersionChar{
    appointment: number[],
    labels: string[]
}
export default function DispersionChart({data}:{data:DispersionChar}) {
  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <LineChart
        series={[
          { data: data.appointment, label: 'Nbr de RDV par mois', yAxisId: 'leftAxisId' },
        ]}
        xAxis={[{ scaleType: 'point', data: data.labels, height: 28 }]}
        yAxis={[
          { id: 'leftAxisId', width: 50 },
        ]}
      />
    </Box>
  );
}
