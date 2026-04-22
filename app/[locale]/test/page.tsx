"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";
import bcrypt from "bcryptjs";

export default function TestPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    try {
      const hash = await bcrypt.hash(password, 10);

      await addDoc(collection(db, "admins"), {
        email,
        passwordHash: hash,
        loginAt: new Date(),
      });

      setMsg("Admin added successfully!");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setMsg("Failed to add admin.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">

      <div className="text-xl font-bold mb-6">Add Admin User</div>

      <form
        onSubmit={handleAddAdmin}
        className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded shadow"
      >
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        {msg && (
          <div
            className={`text-sm ${msg.includes("success") ? "text-green-600" : "text-red-600"
              }`}
          >
            {msg}
          </div>
        )}

        <button
          type="submit"
          className="bg-black text-white py-2 rounded font-semibold hover:scale-105 transition"
        >
          Add Admin
        </button>
      </form>
    </div>
  );
}
