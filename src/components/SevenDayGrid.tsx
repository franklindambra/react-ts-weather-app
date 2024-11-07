'use client'

import React from 'react';
import { useWeather } from "../context/WeatherContext";
import WeatherUtils from "../lib/conversionFunctions";

export default function SevenDayGrid() {
  // Use the context to get weather data and location name
  const { weatherData, locationName } = useWeather();

  return (
    <div>
      <p className="mb-5 font-bold">7 Day Forecast for {locationName}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {weatherData.map((day) => (
          <div
            key={day.date}
            className="flex flex-col p-5 border-2 border-slate-500 rounded-md dark:bg-slate-500 dark:border-slate-300 shadow-lg"
          >
            <div style={{ fontSize: '40px' }}>
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
