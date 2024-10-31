interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  }
  
  interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
  }
  
  interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface Daily {
    dt: number;
    temp: Temp;
    feels_like: FeelsLike;
    humidity: number;
    wind_speed: number;
    wind_deg: number;
    weather: Weather[];
    clouds: number;
    pop: number;
    rain?: number; // Optional as some days may not have rain data
  }
  
  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface WeatherData {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    daily: Daily[];
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

export const data = {
    "lat": 51.51,
    "lon": -0.13,
    "timezone": "Europe/London",
    "timezone_offset": 0,
    "daily": [
      {
        "dt": 1605182400,
        "temp": {
          "day": 280.32,
          "min": 278.15,
          "max": 283.15,
          "night": 279.11,
          "eve": 281.11,
          "morn": 278.92
        },
        "feels_like": {
          "day": 278.45,
          "night": 277.98,
          "eve": 279.02,
          "morn": 277.34
        },
        "humidity": 81,
        "wind_speed": 4.1,
        "wind_deg": 80,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "clouds": 90,
        "pop": 0.2,
        "rain": 0.12
      },
      {
        "dt": 1605268800,
        "temp": {
          "day": 282.58,
          "min": 280.15,
          "max": 285.35,
          "night": 281.45,
          "eve": 283.23,
          "morn": 280.18
        },
        "feels_like": {
          "day": 280.72,
          "night": 279.34,
          "eve": 281.91,
          "morn": 279.01
        },
        "humidity": 78,
        "wind_speed": 3.8,
        "wind_deg": 120,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "few clouds",
            "icon": "02d"
          }
        ],
        "clouds": 25,
        "pop": 0.0
      },
      {
        "dt": 1605355200,
        "temp": {
          "day": 285.75,
          "min": 283.24,
          "max": 287.66,
          "night": 284.13,
          "eve": 286.23,
          "morn": 283.31
        },
        "feels_like": {
          "day": 284.29,
          "night": 283.45,
          "eve": 285.22,
          "morn": 282.48
        },
        "humidity": 75,
        "wind_speed": 4.6,
        "wind_deg": 135,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "clouds": 0,
        "pop": 0.0
      },
      {
        "dt": 1605441600,
        "temp": {
          "day": 287.55,
          "min": 285.33,
          "max": 289.28,
          "night": 286.44,
          "eve": 288.05,
          "morn": 285.12
        },
        "feels_like": {
          "day": 286.32,
          "night": 285.23,
          "eve": 287.04,
          "morn": 284.78
        },
        "humidity": 72,
        "wind_speed": 5.2,
        "wind_deg": 150,
        "weather": [
          {
            "id": 802,
            "main": "Clouds",
            "description": "scattered clouds",
            "icon": "03d"
          }
        ],
        "clouds": 40,
        "pop": 0.1
      },
      {
        "dt": 1605528000,
        "temp": {
          "day": 288.65,
          "min": 286.45,
          "max": 290.87,
          "night": 287.23,
          "eve": 289.56,
          "morn": 286.05
        },
        "feels_like": {
          "day": 287.45,
          "night": 286.14,
          "eve": 288.45,
          "morn": 285.35
        },
        "humidity": 69,
        "wind_speed": 5.6,
        "wind_deg": 170,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
          }
        ],
        "clouds": 60,
        "pop": 0.15
      },
      {
        "dt": 1605614400,
        "temp": {
          "day": 289.71,
          "min": 287.78,
          "max": 292.12,
          "night": 288.33,
          "eve": 291.25,
          "morn": 287.56
        },
        "feels_like": {
          "day": 288.45,
          "night": 287.15,
          "eve": 290.04,
          "morn": 286.85
        },
        "humidity": 65,
        "wind_speed": 6.2,
        "wind_deg": 180,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "clouds": 75,
        "pop": 0.25,
        "rain": 0.28
      },
      {
        "dt": 1605700800,
        "temp": {
          "day": 290.55,
          "min": 288.44,
          "max": 293.32,
          "night": 289.14,
          "eve": 292.45,
          "morn": 288.21
        },
        "feels_like": {
          "day": 289.23,
          "night": 288.12,
          "eve": 291.12,
          "morn": 287.32
        },
        "humidity": 60,
        "wind_speed": 6.8,
        "wind_deg": 200,
        "weather": [
          {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
          }
        ],
        "clouds": 85,
        "pop": 0.5,
        "rain": 1.25
      },
      {
        "dt": 1605787200,
        "temp": {
          "day": 291.62,
          "min": 289.77,
          "max": 294.58,
          "night": 290.54,
          "eve": 293.11,
          "morn": 289.56
        },
        "feels_like": {
          "day": 290.24,
          "night": 289.45,
          "eve": 292.15,
          "morn": 288.98
        },
        "humidity": 58,
        "wind_speed": 7.0,
        "wind_deg": 210,
        "weather": [
          {
            "id": 502,
            "main": "Rain",
            "description": "heavy rain",
            "icon": "10d"
          }
        ],
        "clouds": 90,
        "pop": 0.6,
        "rain": 2.12
      }
    ]
   } as const;
  