import { Bar } from "react-chartjs-2";
import styles from "./HumidityChart.module.css"; // Change this if you have a separate CSS module for HumidityChart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Use the same WeatherData interface from the RadiationChart
interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    relativehumidity_2m: string;
    direct_radiation: string;
  };
  hourly: {
    time: string[];
    relativehumidity_2m: number[];
    direct_radiation: number[];
  };
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

// Define the props interface for HumidityChart
interface HumidityChartProps {
  data: WeatherData;
}

const HumidityChart = ({ data }: HumidityChartProps) => {
  const labels = data.hourly.time;
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Relative Humidity",
        data: data.hourly.relativehumidity_2m,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default HumidityChart;
