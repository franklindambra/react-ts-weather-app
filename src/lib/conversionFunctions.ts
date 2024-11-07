class WeatherUtils {


  static kelvinToFahrenheit(kelvin: number): number {
      let calculatedNumber = (kelvin - 273.15) * (9 / 5) + 32;
      return Math.trunc(calculatedNumber);
  }

  static fahrenheitToKelvin(fahrenheit: number): number {
      return (fahrenheit - 32) * (5 / 9) + 273.15;
  }

  static celsiusToFahrenheit(celsius: number): number {
      return Math.trunc(celsius * (9 / 5) + 32);
  }

  static getCloudIcon = (clouds: number) => {
      if (clouds < 20) {
          return '☀️'; // Clear sky
      } else if (clouds < 50) {
          return '🌤️'; // Few clouds
      } else if (clouds < 80) {
          return '☁️'; // Partly cloudy
      } else {
          return '🌧️'; // Overcast
      }
  };
}

export default WeatherUtils;
