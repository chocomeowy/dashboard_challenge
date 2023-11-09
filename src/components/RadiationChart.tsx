import { Line } from "react-chartjs-2";
import styles from "./RadiationChart.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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

// Define the props interface
interface RadiationChartProps {
  data: WeatherData; // Make sure WeatherData is defined and imported if it's in a separate file
}

const RadiationChart = ({ data }: RadiationChartProps) => {
  // No need to call useWeather here since we're now receiving the weather data via props

  const labels = data.hourly.time;
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Direct Radiation",
        data: data.hourly.direct_radiation,
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.5)",
        fill: true,
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RadiationChart;
