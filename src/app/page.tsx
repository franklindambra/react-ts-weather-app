"use client";

import React, {Suspense} from "react";
import Weather from "@/components/Weather";

// Spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
  </div>
);

export default function Home() {
  return (
      <Weather />
  );
}
