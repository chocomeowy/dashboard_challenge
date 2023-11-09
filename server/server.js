const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;

// Support JSON-encoded bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Path for the file where the weather data will be stored
const dataFilePath = path.join(__dirname, "weatherData.json");

// Function to read weather data from the file asynchronously
const readWeatherData = async () => {
  try {
    const data = await fsp.readFile(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If the file does not exist or there is an error, we return null
    return null;
  }
};

// Function to write weather data to the file asynchronously
const writeWeatherData = async (data) => {
  try {
    const dataString = JSON.stringify(data, null, 2);
    await fsp.writeFile(dataFilePath, dataString, "utf8");
    return true;
  } catch (error) {
    console.error("Error writing weather data to file:", error);
    return false;
  }
};

// Adjust the endpoints to use the asynchronous functions
app.get("/weather", async (req, res) => {
  try {
    const weatherDataCache = await readWeatherData();
    if (weatherDataCache) {
      res.json(weatherDataCache);
    } else {
      res.status(404).send("No weather data available");
    }
  } catch (error) {
    res.status(500).send("Failed to read weather data");
  }
});

app.post("/weather", async (req, res) => {
  try {
    const updateSuccess = await writeWeatherData(req.body);
    if (updateSuccess) {
      res.status(200).send("Weather data updated successfully");
      // console.log("posted");
    } else {
      res.status(500).send("Failed to update weather data");
    }
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Local server listening at http://localhost:${port}`);
});
