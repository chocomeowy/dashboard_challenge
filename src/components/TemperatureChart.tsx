import { Line } from "react-chartjs-2";
import { WeatherData } from "../types/weather"; // Assuming this is where you've defined WeatherData
import styles from "./TemperatureChart.module.css";
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

interface TemperatureChartProps {
  data: WeatherData; // This is the prop being passed down from App.tsx
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  // You don't need to call useWeather here because you're passing the data as a prop
  if (!data) {
    return <div>Loading...</div>;
  }

  const labels = data.daily.time;
  const chartData = {
    // Renamed this to chartData to avoid name conflict with the prop 'data'
    labels: labels,
    datasets: [
      {
        label: "Max Temperature",
        data: data.daily.temperature_2m_max,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: false,
      },
      {
        label: "Min Temperature",
        data: data.daily.temperature_2m_min,
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TemperatureChart;
