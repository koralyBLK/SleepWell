import { useState, useEffect } from "react";

export default function Catalog() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/groups/1/items/")
      .then((response) => response.json())
      .then((data) => setItems(data));

    fetch("http://127.0.0.1:8000/users/1/")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  let itemsList = items.map((v, idx) => {
    let isReedemed = (user?.redeemed_items_id ?? [])
      .map((t) => t[0])
      .includes(v.id);

    return (
      <li
        key={idx}
        className="p-3 shadow rounded-2xl mt-2 flex items-center space-x-5 cursor-pointer "
        style={{
          backgroundColor: isReedemed ? "lightgray" : "",
        }}
        onClick={() => {
          if (isReedemed) {
            return;
          }

          setSelectedItem(v);
        }}
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

  return (
    <div className="max-w-3xl mx-auto p-6 h-screen flex flex-col relative">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">
        Catalog
      </h1>
      <ul>{itemsList}</ul>
      <a
        className="mt-auto bg-blue-500 text-white text-2xl py-2 rounded-lg shadow-md transition duration-300 text-center"
        href="/"
      >
        Back
      </a>

      {selectedItem && (
        <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2>
            <img
              src={selectedItem.imgUrl}
              alt={selectedItem.title}
              className="max-w-40 mx-auto mb-4"
            />
            <p className="text-xl font-mono mb-4">
              Price: {selectedItem.price}🪙
            </p>
            <div className="space-x-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-lg"
                onClick={() => setSelectedItem(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  const options = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      user_id: 1,
                      item_id: selectedItem.id,
                    }),
                  };

                  fetch("http://127.0.0.1:8000/redeem/", options)
                    .then((response) => response.json())
                    .then((data) => console.log(data));

                  setSelectedItem(null);
                  window.location.reload();
                }}
              >
                Redeem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
