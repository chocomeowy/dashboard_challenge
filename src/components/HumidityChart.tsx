// src/components/HumidityChart.tsx

import { Bar } from "react-chartjs-2";
import styles from "./RadiationChart.module.css";
import { useWeather } from "../hooks/useWeather";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HumidityChart = () => {
  const weatherData = useWeather();

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: weatherData.hourly.time,
    datasets: [
      {
        label: "Relative Humidity",
        data: weatherData.hourly.relativehumidity_2m,
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default HumidityChart;
