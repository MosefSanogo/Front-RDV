import { PieChart } from '@mui/x-charts/PieChart';
import type { PieValueType } from '@mui/x-charts';

// Étendre le type PieValueType
export interface CicularChar extends Partial<Omit<PieValueType, 'id'>> {
  value: number;
  label: string;
}

export default function CircularChart({data}: {data: CicularChar[]}) {
  return (
    <PieChart
      series={[
        {
          data: data.map((item,i) => ({
            ...item,
            id: i
          }))
        },
      ]}
      width={200}
      height={200}
    />
  );
}