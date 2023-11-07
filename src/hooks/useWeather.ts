// src/hooks/useWeather.ts

import { useState, useEffect } from 'react';
import axios from 'axios';

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

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&start_date=2023-10-01&end_date=2023-10-10');
        setWeatherData(result.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  return weatherData;
};
