// src/App.tsx

import HumidityChart from "./components/HumidityChart";
import TemperatureChart from "./components/TemperatureChart";
import RadiationChart from "./components/RadiationChart";
import styles from "./Dashboard.module.css";
const App = () => {
  return (
    <div className="App">
      <div className={styles.dashboard}>
        <div className={styles.chartContainer}>
          <TemperatureChart />
        </div>
        <div className={styles.chartContainer}>
          <HumidityChart />
        </div>
        <div className={styles.chartContainer}>
          <RadiationChart />
        </div>
      </div>
    </div>
  );
};

export default App;
