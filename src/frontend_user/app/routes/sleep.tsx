import Heatmap from "../components/heatmap";
import { useState, useEffect } from "react";

export default function Home() {
  const ARRAY_LENGTH = 5;
  const [index, setIndex] = useState(0);

  let animationArray = Array(ARRAY_LENGTH).fill(".");
  animationArray[index] = "💤";
  let animationText = animationArray.join("");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % ARRAY_LENGTH);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 h-screen flex flex-col">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">
        Sleeping
      </h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 text-gray-700 text-xl">
        <p className="text-2xl">
          Alarm will ring at <span className="font-bold">06:00</span>
        </p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 text-gray-700 text-xl">
        <p>You will not get rewards for the night if you leave the app.</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 text-gray-700 text-xl">
        <p className="text-center font-mono text-5xl">{animationText}</p>
      </div>

      <div className="flex space-x-4 mt-auto mb-4">
        <a
          className="flex-4 bg-blue-950 text-white text-2xl py-2 rounded-lg shadow-md transition duration-300 text-center"
          href="/"
        >
          Stop
        </a>
      </div>
    </div>
  );
}
