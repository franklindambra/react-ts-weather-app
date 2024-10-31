import React from "react";
import { data } from "../lib/weatherData";
import WeatherUtils from '../lib/conversionFunctions';

const Day: React.FC = () => {


  return (
<section>
    <p className="mb-5 font-bold">8 Day forecast</p>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
  {data.daily.map((day) => (
    <div key={day.dt} className="flex flex-col p-5 border-2 border-sky-500 rounded-md dark:bg-slate-500 dark:border-slate-400 shadow-lg dark:shadow-slate-100/40">
      <p className="font-bold">{WeatherUtils.formattedDate(day.dt)}</p>
      <p>High:{WeatherUtils.kelvinToFahrenheit(day.temp.day)} degrees</p>
    </div>
  ))}
</div>
</section>


  );
};

export default Day;
