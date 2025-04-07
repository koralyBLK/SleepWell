import { useState, useEffect } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/groups/1/items/")
      .then((response) => response.json())
      .then((data) => setItems(data));

    fetch("http://127.0.0.1:8000/groups/1/users/")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const itemsList = items
    .sort((a, b) => a.price - b.price)
    .map((v) => {
      return (
        <li
          key={v.id}
          className="p-3 shadow rounded-2xl mt-2 flex items-center space-x-5"
        >
          <img
            src={v.imgUrl}
            className="max-w-10 max-h-10 flex-1"
            alt={v.title}
          />
          <div className="flex-3 text-xl">{v.title}</div>
          <div className="flex-1 text-3xl text-right font-mono">{v.price}</div>
        </li>
      );
    });

  const redeemed_items = users
    ?.flatMap((user) =>
      user.redeemed_items_id.map((id) => ({
        user: user.name,
        item: items?.find((item) => item.id == id[0])?.title,
        timestamp: id[1],
      }))
    )
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((entry, idx) => (
      <li
        key={idx}
        className="p-3 shadow rounded-2xl mt-2 flex items-center space-x-5"
      >
        <div className="flex-1 text-xl">{entry.user}</div>
        <div className="flex-2 text-xl">{entry.item}</div>
        <div className="flex-2 text-xs">{entry.timestamp}</div>
      </li>
    ));

  return (
    <div className="max-w-3xl mx-auto p-6 h-screen flex flex-col">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">
        SleepWell Manager
      </h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 text-gray-700 text-xl">
        <h2 className="text-3xl">Catalog</h2>
        <div>
          <ul>{itemsList}</ul>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
          onClick={() => {}}
        >
          Add Reward
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 text-gray-700 text-xl">
        <h2 className="text-3xl">Redeemed rewards</h2>
        {redeemed_items}
      </div>
    </div>
  );
}
