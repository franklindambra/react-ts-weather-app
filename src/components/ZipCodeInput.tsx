import React from "react";
import { useWeatherContext } from "../../context/context";

export default function ZipCodeInput() {
  const { setZipCode, handleFetchWeather } = useWeatherContext();
  return (
    <div>
      {" "}
      <div className="p-10">
        <p className="font-bold mb-2">Enter Zip Code</p>
        <input
          type="number"
          onChange={(e) => setZipCode(Number(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && handleFetchWeather()}
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
    </div>
  );
}
