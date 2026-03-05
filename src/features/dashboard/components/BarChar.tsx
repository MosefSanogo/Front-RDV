import { BarChart } from "@mui/x-charts";
import "./barcChart.css";
export interface BarChartData {
  time: string[],
  total_reservations: number[]
}
export default function SimpleCharts({data}: {data: BarChartData}) {
  return (
    <BarChart
      xAxis={[
        {
          scaleType: "band",
          data: data.time,
        },
      ]}
      series={[{ type: 'bar', id: 'base', data: data.total_reservations }]}
      height={500}
      yAxis={[{ width: 30, scaleType: "linear" }]}
      margin={{ left: 0, right: 10, top: 10, bottom: 0 }}
    />
  );
}
