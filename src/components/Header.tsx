import React from "react";

export default function Header() {
  return (
    <div className="p-10 bg-slate-800 w-full fixed text-slate-100">
      <h1 className="text-3xl mb-2">
        <b>Weather</b>
      </h1>
      <p className="mb-2">by <b>Frank Dambra</b></p>
      <p className="text-sm">NextJS (React), TypeScript & Tailwind CSS</p>
    </div>
  );
}
