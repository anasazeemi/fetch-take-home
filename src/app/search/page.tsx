"use client";

import { useEffect, useState } from "react";

// Create a Dog object to later populate through the API
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function SearchPage() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        // Fetch the DOG id's
        const res = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs/search?size=100&sort=breed:asc",
          { method: "GET", credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to fetch DOG IDs");

        const { resultIds } = await res.json();

        // Feth all the Dog data and convert it into a JSON string
        const dogsRes = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resultIds),
          }
        );

        if (!dogsRes.ok) throw new Error("Failed to fetch dog data");

        const dogsData = await dogsRes.json();
        setDogs(dogsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  // Makes sure to map all the Dog objects to the UI
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search for Dogs</h1>

      {loading && <p>Loading dogs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dogs.map((dog) => (
          <div key={dog.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={dog.img} alt={dog.name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{dog.name}</h2>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age} years</p>
            <p>Location: {dog.zip_code}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
