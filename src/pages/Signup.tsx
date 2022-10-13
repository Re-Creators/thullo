import React, { FormEvent, useState } from "react";
import { updateUser } from "../api/services/user";
import { supabase } from "../api/supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          avatar_url: `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${username}`,
        },
      },
    });
    if (error) {
      // TODO: add appropriate error handling
      console.log("Error");
    }
  };

  return (
    <div className="w-1/3 mx-auto mt-24 p-8 rounded-lg bg-white shadow-lg  ">
      <form onSubmit={handleSignup}>
        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            Password
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
