import HumidityChart from "./components/HumidityChart";
import TemperatureChart from "./components/TemperatureChart";
import RadiationChart from "./components/RadiationChart";
import styles from "./Dashboard.module.css";

import { useWeather } from "./hooks/useWeather";

const App = () => {
  const { weatherData, loading, error } = useWeather(); // Add error handling

  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  // Ensure weatherData is not null before rendering child components
  if (!weatherData) {
    return <div>No weather data available.</div>;
  }

  return (
    <div className="App">
      <div className={styles.dashboard}>
        <div className={styles.chartContainer}>
          <TemperatureChart data={weatherData} />
        </div>
        <div className={styles.chartContainer}>
          <HumidityChart data={weatherData} />
        </div>
        <div className={styles.chartContainer}>
          <RadiationChart data={weatherData} />
        </div>
      </div>
    </div>
  );
};

export default App;
