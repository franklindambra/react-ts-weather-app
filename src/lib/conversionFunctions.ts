class WeatherUtils {
    static formattedDate(date: number): string {
        const multipliedDate = new Date(date * 1000);
        return multipliedDate.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    static kelvinToFahrenheit(kelvin: number): number {
        return (kelvin - 273.15) * (9 / 5) + 32;
    }

    static fahrenheitToKelvin(fahrenheit: number): number {
        return (fahrenheit - 32) * (5 / 9) + 273.15;
    }
}

export default WeatherUtils;
