import Day from "@/components/8-day";

export default function Home() {
  
  return (
    <div className="bg-white p-5 h-screen dark:bg-black dark:text-cyan-50">
      <h1 className="text-lg mb-2"><b>Weather</b> by <b>Franklin J Dambra</b></h1>
      <p className="mb-2 max-w-50%">This application uses a static data set modeled on the open-weather API. <a className="underline" href="">View Source Code</a></p>
      <p className="font-bold">Tech Stack</p>
      <ul className="mb-5"><li>NextJs (React Framework)</li><li>TypeScript</li><li>Tailwind CSS</li></ul>
      <Day></Day>
    </div>
  );
}
