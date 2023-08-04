import React, { FormEvent, FormEventHandler, useState } from "react";
import { supabase } from "../api/supabaseClient";
import useUserStore from "../store/useUserStore";
import { Link, Navigate } from "react-router-dom";
import { MdLock, MdMail } from "react-icons/md";
import logo from "../assets/images/Logo.svg";
import { AuthError } from "@supabase/supabase-js";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useUserStore((state) => state.user);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (err: AuthError | any) {
      console.log(err);
      setError("Invalid login credentials");
    } finally {
      setIsLoading(false);
    }
  };

  if (user) return <Navigate to="/" />;
  return (
    <div className="md:min-h-screen flex md:justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 px-5 py-5 md:m-auto">
        <div className="rounded-lg md:border md:border-gray-500 md:px-10 md:py-10">
          <section>
            <img src={logo} alt="Logo" />
            <h1 className="text-left my-5 font-semibold">Login</h1>
          </section>
          <section className="mt-8 md:mt-5">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="email"
                  className="w-full border border-gray-400 p-2 pl-10 text-sm rounded-md"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdMail className="w-10 h-10 absolute left-0 top-0 p-2 text-gray-500" />
              </div>
              <div className="relative mt-8 md:mt-5">
                <input
                  type="password"
                  className="w-full border border-gray-400 p-2 pl-10 text-sm rounded-md"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <MdLock className="w-10 h-10 absolute left-0 top-0 p-2 text-gray-500" />
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white text-sm mt-5 rounded-lg hover:bg-blue-600 active:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
              <p className="mt-2 text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
