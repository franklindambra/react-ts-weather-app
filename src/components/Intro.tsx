import React from "react";

export default function Intro() {
  return (
    <section className="pb-10">
      {" "}
      <p className="mb-2 max-w-50%">
        This application uses a static data set modeled on the open-weather API.{" "}
        <a
          target="_blank"
          className="underline"
          href="https://github.com/franklindambra/react-ts-weather-app"
        >
          View Source Code
        </a>
      </p>
    </section>
  );
}
