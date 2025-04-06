import Heatmap from "../components/heatmap";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6 h-screen flex flex-col">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">
        SleepWell
      </h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 text-gray-700 text-xl">
        <h2 className="text-3xl">Streak</h2>
        <p className="mt-3 text-center">
          <span className="font-semibold">19 days</span> (current)
        </p>
        <p className="text-center">
          <span className="font-semibold">34 days</span> (max)
        </p>

        <Heatmap></Heatmap>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 text-gray-700 text-xl">
        <h2 className="text-3xl">Goal: </h2>
        <p className="text-gray-700 font-semibold text-3xl text-center">
          22:00-06:00
        </p>
      </div>

      <div className="flex space-x-4 mt-auto mb-4">
        <a
          className="flex-1 bg-blue-500 text-white text-2xl py-2 rounded-lg shadow-md transition duration-300 text-center"
          href="/catalog"
        >
          Catalog
        </a>
        <a
          className="flex-2 bg-blue-950 text-white text-2xl py-2 rounded-lg shadow-md transition duration-300 text-center"
          href="/sleep"
        >
          Sleep
        </a>
      </div>
    </div>
  );
}
