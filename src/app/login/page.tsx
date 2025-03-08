"use client"; // Ensures it runs on the client

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
      method: "POST",
      credentials: "include", // Important for auth cookies
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      router.push("/search"); // Redirect to search page
    } else {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
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
        <button 
          onClick={handleLogin} 
          className="bg-blue-500 text-white p-2 rounded w-full mt-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}
