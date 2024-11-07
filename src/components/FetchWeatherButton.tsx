'use client'

import React from 'react';
import { useWeather } from "../context/WeatherContext";

export default function FetchWeatherButton() {
  const { setZipCode, handleFetchWeather } = useWeather();

  return (
    <div className="mb-5">
      <p className="font-bold mb-2">Enter Zip Code</p>
      <input
        type="number"
        onChange={(e) => setZipCode(Number(e.target.value))} // Convert the input value to a number
        placeholder="Zip Code"
        className="mr-2 p-2 border text-black"
      />

      <button
        onClick={handleFetchWeather}
        className="p-2 bg-blue-500 text-white rounded ml-2"
      >
        Fetch Weather
      </button>
    </div>
  );
}
