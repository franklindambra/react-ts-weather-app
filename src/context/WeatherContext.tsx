'use client'

// WeatherContext.tsx
import React, { createContext, useContext, useState} from "react";


interface WeatherDay {
  date: string;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  clouds: number;
}

interface WeatherContextType {
  weatherData: WeatherDay[];
  locationName: string;
  zipCode: number;
  setZipCode: (zip: number) => void;
  handleFetchWeather: () => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);


export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);

  const [zipCode, setZipCode] = useState();
  const [locationName, setLocationName] = useState("");

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

 

  const getCoordinates = async (zipCode: number) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&format=json&countrycodes=US`);
    const data = await response.json();
    if (data && data.length > 0) {
      return { latitude: data[0].lat, longitude: data[0].lon, display_name: data[0].display_name };
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,cloudcover_mean&timezone=auto`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");

      const data = await response.json();
      const dailyData = data.daily.time.map((date: string, index: number) => ({
        date,
        tempMax: data.daily.temperature_2m_max[index],
        tempMin: data.daily.temperature_2m_min[index],
        precipitation: data.daily.precipitation_sum[index],
        clouds: data.daily.cloudcover_mean[index],
      }));

      setWeatherData(dailyData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchWeather = async () => {
    const coordinates = await getCoordinates(zipCode);
    if (coordinates) {
      setLatitude(coordinates.latitude);
      setLongitude(coordinates.longitude);
      setLocationName(coordinates.display_name);
      fetchWeather();
    } else {
      console.error("Failed to retrieve coordinates");
    }
  };

  return (
    <WeatherContext.Provider value={{ weatherData, locationName, zipCode, setZipCode, handleFetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
