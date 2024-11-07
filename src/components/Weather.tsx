"use client";

import WeatherUtils from "@/lib/conversionFunctions";
import React, { useState, useEffect } from "react";

// Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

export default function Weather() {
  interface WeatherDay {
    date: string;
    tempMax: number;
    tempMin: number;
    precipitation: number;
    clouds: number;
  }

  interface LatAndLong {
    latitude: number;
    longitude: number;
  }

  const [userLocation, setUserLocation] = useState<LatAndLong | null>(null);
  const [forecastData, setForecastData] = useState<WeatherDay[]>([]);
  const [locationName, setLocationName] = useState("");
  const [currentWeather, setCurrentWeather] = useState<WeatherDay | null>(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            fetchWeather(latitude, longitude);
            fetchLocationName(latitude, longitude);
          },
          (error) => {
            console.error("Error getting user location: ", error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser");
      }
    };

    getUserLocation();
  }, []);

  const fetchLocationName = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
      );
      if (!response.ok) throw new Error("Failed to fetch location name");

      const data = await response.json();
      setLocationName(data.address?.city + " "  + data.address?.state || "Unknown Location");
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,cloudcover_mean&current_weather=true&timezone=auto`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");

      const data = await response.json();

      const currentWeather: WeatherDay = {
        date: data.daily.time[0],
        tempMax: data.daily.temperature_2m_max[0],
        tempMin: data.daily.temperature_2m_min[0],
        precipitation: data.daily.precipitation_sum[0],
        clouds: data.daily.cloudcover_mean[0],
      };

      setCurrentWeather(currentWeather);

      const dailyData = data.daily.time.map((date: string, index: number) => ({
        date: data.daily.time[index + 1],
        tempMax: data.daily.temperature_2m_max[index + 1],
        tempMin: data.daily.temperature_2m_min[index + 1],
        precipitation: data.daily.precipitation_sum[index + 1],
        clouds: data.daily.cloudcover_mean[index + 1],
      }));

      const truncatedData = dailyData.slice(0, -1);

      setForecastData(truncatedData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  if (!userLocation || !forecastData.length || !currentWeather) {
    return (
      <div className="p-10 h-screen flex flex-col items-center">
        <Spinner />
        <p className="mt-4">Finding your location...</p>
      </div>
    );
  }

  return (
    <div className="p-10 h-screen">
      <h2 className="text-2xl mb-4">{locationName}</h2>
      
      <div>
        <p>Current Weather</p>
        <div style={{ fontSize: "40px" }}>
          {WeatherUtils.getCloudIcon(currentWeather?.clouds)}
          <p>High: {WeatherUtils.celsiusToFahrenheit(currentWeather?.tempMax ?? 0)} °F</p>
          <p>Low: {WeatherUtils.celsiusToFahrenheit(currentWeather?.tempMin ?? 0)} °F</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {forecastData.map((day) => (
          <div
            key={day.date}
            className="flex flex-col p-5 border-2 border-slate-500 rounded-md dark:bg-slate-500 dark:border-slate-300 shadow-lg"
          >
            <div style={{ fontSize: "40px" }}>
              {WeatherUtils.getCloudIcon(day.clouds)}
            </div>
            <p className="font-bold">{day.date}</p>
            <p>High: {WeatherUtils.celsiusToFahrenheit(day.tempMax)} °F</p>
            <p>Low: {WeatherUtils.celsiusToFahrenheit(day.tempMin)} °F</p>
            <p>Precipitation: {day.precipitation} inches</p>
            <p>Cloud Cover: {day.clouds}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
