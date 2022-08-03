import React, { FormEvent, FormEventHandler, useState } from "react";
import { supabase } from "../api/supabaseClient";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
      console.log("Berhasil Login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-1/3 mx-auto mt-24 p-8 rounded-lg bg-white shadow-lg  ">
      <form onSubmit={handleLogin}>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 w-full border outline-blue-400"
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 w-full border outline-blue-400"
          />
        </div>
        <div className="mt-5">
          <button
            className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
