"use client";
import { WeatherProvider } from '../../context/context';
import ZipCodeInput from '@/components/ZipCodeInput';

import Weather from "@/components/Weather";

export default function Home() {
  return (
    <WeatherProvider>
      <ZipCodeInput></ZipCodeInput>

      <Weather />
      </WeatherProvider>
  );
}
