// src/components/TemperatureChart.tsx
import { Line } from "react-chartjs-2";
import styles from "./TemperatureChart.module.css";
import { useWeather } from "../hooks/useWeather";
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

const TemperatureChart = () => {
  const weatherData = useWeather();

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const labels = weatherData.daily.time;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Max Temperature",
        data: weatherData.daily.temperature_2m_max,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: false,
      },
      {
        label: "Min Temperature",
        data: weatherData.daily.temperature_2m_min,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Line data={data} options={options} />
    </div>
  );
};

export default TemperatureChart;
