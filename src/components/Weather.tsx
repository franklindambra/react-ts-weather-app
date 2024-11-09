"use client";

import { useWeatherContext } from "../../context/context";
import WeatherUtils from "@/lib/conversionFunctions";
import React from "react";

// Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

export default function Weather() {
  const {
    userLocation,
    currentWeather,
    locationName,
    forecastData,
  } = useWeatherContext();

  if (!userLocation || !forecastData.length || !currentWeather) {
    return (
      <div className="p-10 h-screen flex flex-col items-center">
        <Spinner />
        <p className="mt-4">Getting weather...</p>
      </div>
    );
  }

  return (
    <div className="px-10 ">
      
      <h2 className="text-2xl mb-4">{locationName}</h2>
      <div className="flex flex-col p-5 border-2 border-slate-500 rounded-md dark:bg-slate-500 dark:border-slate-300 shadow-lg mb-4">
        
        <p className="font-bold">Current Weather</p>
        <div>
        <div style={{ fontSize: "40px" }}>
              {WeatherUtils.getCloudIcon(currentWeather.clouds)}
            </div>
          <p>
            High:{" "}
            {WeatherUtils.celsiusToFahrenheit(currentWeather?.tempMax ?? 0)} °F
          </p>
          <p>
            Low:{" "}
            {WeatherUtils.celsiusToFahrenheit(currentWeather?.tempMin ?? 0)} °F
          </p>
          <p>Precipitation: {currentWeather.precipitation} inches</p>
          <p>Cloud Cover: {currentWeather.clouds}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
