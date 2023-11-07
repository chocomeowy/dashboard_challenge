// src/components/RadiationChart.tsx
import { Line } from "react-chartjs-2";
import styles from "./RadiationChart.module.css";
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

const RadiationChart = () => {
  const weatherData = useWeather();

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const labels = weatherData.hourly.time;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Direct Radiation",
        data: weatherData.hourly.direct_radiation,
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
      <Line data={data} options={options} />
    </div>
  );
};

export default RadiationChart;
