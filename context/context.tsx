// context/WeatherContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface WeatherContextType {
  userLocation: LatAndLong | null;
  forecastData: WeatherDay[];
  locationName: string;
  currentWeather: WeatherDay | null;
  zipCode: number | undefined;
  setZipCode: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleFetchWeather: () => Promise<void>;
  fetchWeather: (latitude: number, longitude: number) => Promise<void>;
  fetchLocationName: (latitude: number, longitude: number) => Promise<void>;
}

interface ProviderProps {
  children: ReactNode;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<ProviderProps> = ({ children }) => {
  const [userLocation, setUserLocation] = useState<LatAndLong | null>(null);
  const [forecastData, setForecastData] = useState<WeatherDay[]>([]);
  const [locationName, setLocationName] = useState<string>("");
  const [currentWeather, setCurrentWeather] = useState<WeatherDay | null>(null);
  const [zipCode, setZipCode] = useState<number | undefined>(undefined);

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

  const handleFetchWeather = async () => {
    setUserLocation(null);

    if (!zipCode) {
      console.error("Zip code is required");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&format=json&countrycodes=US`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const latitude = parseFloat(data[0].lat);
        const longitude = parseFloat(data[0].lon);

        setUserLocation({ latitude, longitude });
        fetchWeather(latitude, longitude);
        fetchLocationName(latitude, longitude);
      } else {
        console.error("Location not found for the provided zip code");
      }
    } catch (error) {
      console.error("Error fetching location by zip code:", error);
    }
  };

  const fetchLocationName = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
      );
      if (!response.ok) throw new Error("Failed to fetch location name");

      const data = await response.json();
      setLocationName(
        data.address?.city + " " + data.address?.state || "Unknown Location"
      );
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

      setForecastData(dailyData.slice(0, -1));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        userLocation,
        forecastData,
        locationName,
        currentWeather,
        zipCode,
        setZipCode,
        handleFetchWeather,
        fetchWeather,
        fetchLocationName,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook to use the WeatherContext
export const useWeatherContext = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
};
