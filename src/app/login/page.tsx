"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const res = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      router.push("/search");
    } catch (err: unknown) {
      // Type-safe error handling
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-xl font-bold">Login</h1>
        <input 
          type="text" placeholder="Name" value={name} 
          onChange={(e) => setName(e.target.value)}
          className="border p-2 my-2 w-full"
        />
        <input 
          type="email" placeholder="Email" value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 my-2 w-full"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button 
          onClick={handleLogin} 
          disabled={loading}
          className={`p-2 rounded w-full mt-2 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
